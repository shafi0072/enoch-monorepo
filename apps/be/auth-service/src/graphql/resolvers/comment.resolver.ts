import {
  Args,
  Mutation,
  Query,
  Resolver,
  Subscription,
  Context,
  Parent,
  ResolveField,
  Int,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { CommentModel } from '../models/comment.model';
import CommentService from 'src/services/comment.service';
import { TwoFAAuthGuard } from 'src/guards/two-fa-auth.guard';
import { CreateCommentInput } from '../dto/create-comment.input';
import { CommentDocument } from '../models/comments.documents';
import { CommonErrors } from 'src/shared/enums/common-erros';

const pubSub = new PubSub();
@Resolver(() => CommentModel)
export class CommentsResolver {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(TwoFAAuthGuard)
  @Query(() => CommentDocument)
  async getCommentsByid(
    @Context() { user },
    @Args('postId', { nullable: false }) postId: string,
    @Args('nextCursor', { nullable: true }) nextCursor: string,
    @Args('limit', { nullable: true }) limit: number,
  ) {
    return await this.commentService.getSingleLevelComments(
      postId,
      nextCursor,
      user,
      limit,
    );
  }

  @UseGuards(TwoFAAuthGuard)
  @Query(() => CommentDocument)
  async getRepliesForComment(
    @Context() { user },
    @Args('postId', { nullable: false }) postId: string,
    @Args('nextCursor', { nullable: true }) nextCursor: string,
    @Args('limit', { nullable: true }) limit: number,
    @Args('commentId') commnetId: string,
  ) {
    return await this.commentService.getSingleLevelComments(
      postId,
      nextCursor,
      user,
      limit,
      commnetId,
    );
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => CommentModel)
  async addComment(
    @Args('postId', { type: () => String }) postId: string,
    @Args('comment') body: CreateCommentInput,
    @Context() { user },
  ) {
    const newComment = await this.commentService.addComment(postId, body, user);
    pubSub.publish('comment', { comment: newComment });
    return newComment;
  }

  @Subscription(() => CommentModel, {
    filter: (payload, variables) => payload.comment.post == variables.postId,
  })
  comment(@Args('postId') postId: string) {
    return pubSub.asyncIterator('comment');
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => String)
  async deleteCommnet(
    @Args('id', { nullable: false }) id: string,
    @Args('postId', { nullable: false }) postId: string,
    @Context() { user },
  ) {
    await this.commentService.deleteCommentandReplies(postId, id, user);
    return 'Comment deleted succesfully';
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => String)
  async addLikeOnComment(
    @Context() { user },
    @Args('postId', { nullable: false }) postId: string,
    @Args('commnetId', { nullable: false }) commentId: string,
  ) {
    try {
      await this.commentService.addLIkeToACommment(postId, commentId, user);
      return 'Like added succesfully';
    } catch {
      throw new Error(CommonErrors.SomethingWentWrong);
    }
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => String)
  async unlikeComment(
    @Context() { user },
    @Args('postId', { nullable: false }) postId: string,
    @Args('commnetId', { nullable: false }) commentId: string,
  ) {
    try {
      await this.commentService.unlikeComment(postId, commentId, user);
      return 'Disliked succesfully';
    } catch {
      throw new Error(CommonErrors.SomethingWentWrong);
    }
  }
}
