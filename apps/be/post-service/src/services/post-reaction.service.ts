import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBService from './db.service';
import {
  PostReaction,
  PostReactionDocument,
} from '../db/schemas/postReaction.schema';
import { CommonErrors } from 'src/shared/enums/common-erros';
import PostService from './post.service';
import { IncDecValue } from 'src/shared/enums/inc-dec';
import { ReactionType } from 'src/db/ENUMS/enums';

@Injectable()
export default class PostReactionService extends DBService<PostReaction> {
  prefix = 'pr';
  idField: string = 'postreactId';
  constructor(
    @InjectModel(PostReaction.name)
    private readonly postReaction: Model<PostReactionDocument>,
    private readonly postService: PostService,
  ) {
    super(postReaction);
  }

  async updateRection(alreadyReacted, reactionType) {
    const oldType = alreadyReacted.type;
    alreadyReacted.type = reactionType;
    await alreadyReacted.save();
    await this.postService.updateReactionCounter(
      alreadyReacted.post,
      reactionType,
      IncDecValue.ONE,
      oldType,
    );
    return 'Reaction changed succesfully';
  }

  async AddOrChangeReaction(postId, reactionType, user) {
    const alreadyReacted = await this.findOne({
      post: postId,
      user: user._id,
    });
    if (alreadyReacted && alreadyReacted.type === reactionType) {
      throw new ConflictException(CommonErrors.postReactionConflict);
    }
    if (alreadyReacted) {
      return await this.updateRection(alreadyReacted, reactionType);
    }
    const createPromise = this.create({
      post: postId,
      type: reactionType,
      user: user._id,
    });
    const updatePromise = this.postService.updateReactionCounter(
      postId,
      reactionType,
      IncDecValue.ONE,
    );
    await createPromise;
    await updatePromise;
    return 'Reaction added succesfully';
  }

  async removeReaction(postId, user) {
    const reaction = await this.findOne({ post: postId, user: user._id });
    await reaction.remove();
    return 'Successfully unliked';
  }

  async getReactionsForPost(postId: string, user, type: string, limit, nextCursor) {
    const options: any = {
      post: postId,
    };

    if (
      type === ReactionType.AMAZE ||
      type === ReactionType.HEART ||
      type === ReactionType.CARE ||
      type === ReactionType.CLAP ||
      type === ReactionType.DISLIKE ||
      type === ReactionType.LIKE ||
      type === ReactionType.IDEA
    ) {
      options.type = type;
    }
    const reactions = await this.postReaction
      .find(options)
      .populate({
        path: 'user',
        select: 'firstName lastName _id avatar username',
      })
      .limit(limit);
      if(reactions.length){
        const startPosition = 0;
        const endPosition =
          reactions.length > limit ? reactions.length - 2 : reactions.length - 1;
        const startCursor = nextCursor;
        const startId = reactions[startPosition]._id;
        const endCursor = parseInt(nextCursor) + 1; 
        const endId = reactions[endPosition]._id;
        const hasMoreposts = reactions.length > limit ? true : false;
      return {
          startId,
          endId,
          hasMoreposts,
          startCursor,
          reactions: 
            reactions.length > limit
                        ? reactions.slice(startPosition, endPosition + 1)
                        : reactions,
          endCursor
        };
      }
  }
}
