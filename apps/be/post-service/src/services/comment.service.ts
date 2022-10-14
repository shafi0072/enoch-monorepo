import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generate } from 'short-uuid';
import DBService from './db.service';
import { Comment, CommentDocument } from '../db/schemas/comment.schema';
import { CommonErrors } from 'src/shared/enums/common-erros';
import { PostFiledNames } from 'src/shared/enums/post-filed-names';
import { IncDecValue } from 'src/shared/enums/inc-dec';
import PostService from './post.service';
import { generateMongooseId } from 'src/utils';
import CommentLikeService from './commetLIke.service';

@Injectable()
export default class CommentService extends DBService<Comment> {
  prefix = 'cmnt';
  idField: string = 'commentID';
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    private readonly postService: PostService,
    private readonly commmentLikeService: CommentLikeService,
  ) {
    super(commentModel);
  }

  async deleteCommentandReplies(post, id, user) {
    // const existingCommnent = await this.findOne({
    //   _id: id,
    //   user: user._id,
    //   post,
    // });
    // if (!existingCommnent) {
    //   throw new BadRequestException();
    // }
    // // const comment: any = await this.commentModel.deleteMany({
    // //   postId: post,
    // //   fullThread: { $regex: `^${existingCommnent.fullThread}` },
    // // });
    // if (comment && comment.deletedCount > 0) {
    //   const deletedCommnetCount = comment.deletedCount * -1;
    //   await this.postService.updateAnyFieldCount(
    //     post,
    //     PostFiledNames.COMMENT_COUNT,
    //     deletedCommnetCount,
    //   );
    // }
    // return comment;
  }

  async addComment(postId, body, user) {
    const parent = body.parentId ? await this.findById(body.parentId) : null;
    if (!parent && body.parentId) {
      throw new BadRequestException(CommonErrors.unableToReply);
    }
    if (body.parentId && parent.post.toString() !== postId) {
      throw new BadRequestException();
    }
    const comment = await this.commentModel.create({
      post: postId,
      user: user._id,
      text: body.text,
      parentId: body.parentId || null,
    });
    await comment.populate({
      path: 'user',
      select: 'firstName lastName _id avatar username',
    });

    if (body.parentId && parent) {
      parent.repliesCount = parent.repliesCount + 1;
      await parent.save();
    }
    await this.postService.updateAnyFieldCount(
      postId,
      PostFiledNames.COMMENT_COUNT,
      IncDecValue.ONE,
    );
    return { ...comment.toJSON() };
  }

  async getSingleLevelComments(
    postId,
    nextCursor,
    user,
    limit,
    commentId = null,
  ) {
    generateMongooseId;
    const match: any = {
      $match: {
        post: generateMongooseId(postId),
        parentId: commentId ? generateMongooseId(commentId) : null,
      },
    };

    if (nextCursor) {
      match.$match.createdAt = { $lt: nextCursor };
    }

    const likedLookup = {
      $lookup: {
        from: 'commentlikes',
        let: {
          postId: '$post',
          commentId: '$_id',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$user', user._id],
                  },
                  {
                    $eq: ['$postId', '$$postId'],
                  },
                  {
                    $eq: ['$commentId', '$$commentId'],
                  },
                ],
              },
            },
          },
        ],
        as: 'Liked',
      },
    };

    const sort = {
      $sort: {
        createdAt: -1,
      },
    };

    const limitAgg = {
      $limit: limit + 1,
    };

    const addField = {
      $addFields: {
        isLiked: {
          $cond: {
            if: {
              $eq: ['$Liked', []],
            },
            then: false,
            else: true,
          },
        },
      },
    };

    const userLookUp = {
      $lookup: {
        from: 'users',
        let: {
          userId: '$user',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$_id', '$$userId'],
                  },
                ],
              },
            },
          },
          {
            $limit: 1,
          },
          {
            $project: {
              avatar: 1,
              firstName: 1,
              lastName: 1,
              _id: 1,
              username: 1,
            },
          },
        ],
        as: 'user',
      },
    };

    const unwindUser = {
      $unwind: {
        path: '$user',
        includeArrayIndex: 'string',
        preserveNullAndEmptyArrays: true,
      },
    };

    const agg = [
      match,
      likedLookup,
      sort,
      limitAgg,
      addField,
      userLookUp,
      unwindUser,
    ];
    const comments = await this.commentModel.aggregate(agg).exec();
    if (comments.length) {
      const startPosition = 0;
      const endPosition =
        comments.length > limit ? comments.length - 2 : comments.length - 1;
      const startCursor = comments[startPosition].createdAt;
      const startId = comments[startPosition]._id;
      const endCursor = comments[endPosition].createdAt;
      const endId = comments[endPosition]._id;
      const hasMoreComments = comments.length > limit ? true : false;

      return {
        startId,
        endId,
        hasMoreComments,
        startCursor,
        comments:
          comments.length > limit
            ? comments.slice(startPosition, endPosition + 1)
            : comments,
        endCursor,
      };
    }
    return [];
  }

  async addLIkeToACommment(postId, commentId, user) {
    await this.commmentLikeService.addLike(postId, commentId, user);
    await this.commentModel.findOneAndUpdate(
      { _id: commentId },
      { $inc: { likeCount: IncDecValue.ONE } },
    );
  }

  async unlikeComment(postId, commentId, user) {
    await this.commmentLikeService.unlikeComment(postId, commentId, user);
    await this.commentModel.findOneAndUpdate(
      { _id: commentId },
      { $inc: { likeCount: IncDecValue.MINUS_ONE } },
    );
  }
}
