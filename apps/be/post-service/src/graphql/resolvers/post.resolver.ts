import {
  Args,
  Mutation,
  Query,
  Resolver,
  Context,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import moment from 'moment';
import { Post } from '../models/post.model';
import { CreatePostInput } from '../dto/create-post.input';
import { TwoFAAuthGuard } from 'src/guards/two-fa-auth.guard';
import PostService from 'src/services/post.service';
import PollPostService from 'src/services/pollPost.service';
import { PollOptionsEnum } from 'src/shared/enums/poll-enums';
import { PollProps } from '../models/poll.model';
import { CommonErrors } from 'src/shared/enums/common-erros';
import { PostType, ReactionType } from 'src/db/ENUMS/enums';
import PostReactionService from 'src/services/post-reaction.service';
import { PostsDocument } from '../models/posts.document.model';
import { PostRections } from '../models/postRection.model';
import { TestingDto } from '../dto/testing.dto';


const pubSub = new PubSub();
@Resolver(() => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    private readonly pollService: PollPostService,
    private readonly postReactionService: PostReactionService,
  ) {}

  @UseGuards(TwoFAAuthGuard)
  @Query(() => Post)
  async getPostbyID(@Context() { user }, @Args('id') id: string) {
    return await this.postService.getPostById(id);
  }

  @UseGuards(TwoFAAuthGuard)
  @Query(() => PostsDocument)
  async getUserTimeLine(
    @Context() { user },
    @Args('nextCursor', { nullable: true }) nextCursor: string,
    @Args('limit') limit: number,
  ) {
    return await this.postService.getUserTimelinePost(user, nextCursor, limit);
  }

  @UseGuards(TwoFAAuthGuard)
  @Query(() => PostsDocument)
  async getUserNewsFeed(
    @Context() { user },
    @Args('nextCursor', { nullable: true }) nextCursor: string,
    @Args('limit') limit: number,
  ) {
    return this.postService.getUserNewsFeedPost(user, nextCursor, limit);
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => Post)
  async createPost(@Context() { user }, @Args('post') body: CreatePostInput) {
    return await this.postService.createPost(body, user);
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => PollProps)
  async addVote(
    @Context() { user },
    @Args('selectedOption') selectedOption: PollOptionsEnum,
    @Args('postId') postId: string,
  ) {
    return await this.pollService.addVote(user, selectedOption, postId);
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => String)
  async addReactionOnPost(
    @Args('postId', { nullable: false }) postId: string,
    @Args('reactionType', { type: () => ReactionType, nullable: false })
    reactionType: ReactionType,
    @Context() { user },
  ) {
    return this.postReactionService.AddOrChangeReaction(
      postId,
      reactionType,
      user,
    );
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => String)
  async removeReactionOnPost(
    @Args('postId', { nullable: false }) postId: string,
    @Context() { user },
  ) {
    try {
      return await this.postReactionService.removeReaction(postId, user);
    } catch {
      throw new Error(CommonErrors.SomethingWentWrong);
    }
  }

  @ResolveField('isExpired', returns => Boolean)
  async isExpired(@Parent() post: Post) {
    if (post.type !== PostType.Poll) {
      return null;
    }
    return (await moment().isBefore(post?.duration)) ? false : true;
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => String)
  async addLikeOnComment (
    @Context() { user },
    @Args('postId', { nullable: false }) postId: string,
    @Args("commnetId",{nullable:false}) commentId:string
  ){
      
  }

  @Query(() => String)
  async checkValidator(  @Args("p") phone:TestingDto){
    return "Hello"
  }

  @UseGuards(TwoFAAuthGuard)
  @Query(() => PostRections)
  async getPostReaction(
    @Context() { user },
    @Args('nextCursor', { nullable: true }) nextCursor: string,
    @Args('postId', { nullable: false }) postId: string,
    @Args('limit') limit: number,
    @Args('type') type: string,
  ) {
    return this.postReactionService.getReactionsForPost(postId, user, type, limit, nextCursor);
  }
}
