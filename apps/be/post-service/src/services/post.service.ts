import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBService from './db.service';
import { Post, PostDocument, PostSchema } from 'src/db/schemas/post.schema';
import PostResourceService from './post-reasource.service';
import { CreatePostInput } from 'src/graphql/dto/create-post.input';
import { PostType, ReactionType, ResourceType } from 'src/db/ENUMS/enums';
import { User } from 'src/db/schemas/user.schema';
import PollPostService from './pollPost.service';
import PostElasticSearchService from './post-elasticseach.service';
import { IncDecValue } from 'src/shared/enums/inc-dec';
import { PostFiledNames } from 'src/shared/enums/post-filed-names';
import RedisService from './redis.service';

@Injectable()
export default class PostService extends DBService<Post> {
  private readonly fieldTypes = new Map([
    [ReactionType.AMAZE, PostFiledNames.AMAZE_COUNT],
    [ReactionType.CARE, PostFiledNames.CARE_COUNT],
    [ReactionType.CLAP, PostFiledNames.CLAP_COUNT],
    [ReactionType.HEART, PostFiledNames.HEART_COUNT],
    [ReactionType.LIKE, PostFiledNames.LIKE_COUNT],
    [ReactionType.IDEA, PostFiledNames.IDEA_COUNT],
    [ReactionType.DISLIKE, PostFiledNames.COMMENT_COUNT],
  ]);
  prefix = 'pt';
  idField: string = 'postId';
  constructor(
    @InjectModel(Post.name) private readonly post: Model<PostDocument>,
    private readonly postResourceService: PostResourceService,
    private readonly pollPostService: PollPostService,
    private readonly redisService: RedisService,
    private readonly postElasticSearchService: PostElasticSearchService,
  ) {
    super(post);
  }

  async updateAnyFieldCount(postId: string, field: string, value: number) {
    return await this.post.findOneAndUpdate(
      { _id: postId },
      { $inc: { [field]: value } },
    );
  }

  async updateReactionCounter(
    postId: string,
    type: ReactionType,
    value: IncDecValue,
    oldType: ReactionType = null,
  ) {
    const field = this.fieldTypes.get(type);
    const oldField = oldType ? this.fieldTypes.get(oldType) : null;
    await this.post.findOneAndUpdate(
      { _id: postId },
      { $inc: { [field]: value, [oldField]: IncDecValue.MINUS_ONE } },
    );
  }

  async getPostById(id: string): Promise<Post> {
    console.log("fetching post list for user");
    return await this.post
      .findById(id)
      .populate('pollProps')
      .exec();
  }

  async createPost(body: CreatePostInput, user: User) {
    if (body.type === PostType.TEXT) {

      const post = await this.create({
        title: body.title,
        caption: body.caption,
        type: PostType.TEXT,
        user: user._id,
        whoCanSee: body.whoCanSee,
      });
      await this.redisService.addPostToFollowerTimeline(user, post);
      return post;
    }
    if (
      body.type === PostType.IMAGE ||
      body.type === PostType.VIDEO ||
      body.type === PostType.DOCUMENT
    ) {
      const post = await this.createMediaPost(body, user);
      this.postElasticSearchService.index(post);
      await this.redisService.addPostToFollowerTimeline(user, post);
      return post;
    }

    if (body.type === PostType.Poll) {
      const post = await this.createPollPost(body, user);
      await this.redisService.addPostToFollowerTimeline(user, post);
      return post;
    }
  }

  async createMediaPost(
    {
      title,
      caption,
      postingAs,
      type,
      resourceId,
      whoCanSee,
      mediaResources,
    }: CreatePostInput,
    user,
  ) {
    const post = await this.create({
      user: user._id,
      title,
      caption,
      type,
      whoCanSee,
      mediaResources,
    });
    await this.redisService.addPostToFollowerTimeline(user, post);
    return post;
  }

  async createPollPost(
    {
      title,
      optionA,
      optionB,
      optionC,
      optionD,
      type,
      whoCanSee,
      duration,
    }: CreatePostInput,
    user,
  ) {
    const pollExpiry: any = await this.pollPostService.getExpiryofPoll(
      duration,
    );
    const post = await this.create({
      user: user._id,
      title,
      type,
      whoCanSee,
      optionA,
      optionB,
      optionC,
      optionD,
      duration: pollExpiry,
      optionACount: 0,
      optionBCount: 0,
      optionCCount: 0,
      optionDCount: 0,
      optionAPercent: 0,
      optionBPercent: 0,
      optionCPercent: 0,
      optionDPercent: 0,
      totalVoteCount: 0,
    });

    await this.redisService.addPostToFollowerTimeline(user, post);
    return post;
  }

  async getUserTimelinePost(user, nextCursor, limit) {
    const options: any = { user: user._id };
    if (nextCursor) {
      options.createdAt = { $lt: nextCursor };
    }
    const posts: any = await this.post
      .find(options)
      .lean()
      .populate({
        path: 'user',
        select: 'firstName lastName _id avatar username bio',
      })
      .limit(limit + 1)
      .sort({ createdAt: 1 });

    if (posts.length) {
      const startPosition = 0;
      const endPosition =
        posts.length > limit ? posts.length - 2 : posts.length - 1;
      const startCursor = posts[startPosition].createdAt;
      const startId = posts[startPosition]._id;
      const endCursor = posts[endPosition].createdAt;
      const endId = posts[endPosition]._id;
      const hasMoreposts = posts.length > limit ? true : false;
      return {
        startId,
        endId,
        hasMoreposts,
        startCursor,
        posts:
          posts.length > limit
            ? posts.slice(startPosition, endPosition + 1)
            : posts,
        endCursor,
      };
    }
    return {};
  }

  async getUserNewsFeedPost(user, nextCursor, limit) {
    const postinredis = await this.redisService.getPostToFollowerTimeline(user, limit, nextCursor);
    const options: any = { _id: {$in: postinredis} };
    const posts: any = await this.post
      .find(options)
      .lean()
      .sort({ createdAt: 1 });
    if (posts.length) {
      const startPosition = 0;
      const endPosition =
        posts.length > limit ? posts.length - 2 : posts.length - 1;
      const startCursor = nextCursor;
      const startId = posts[startPosition]._id;
      const endCursor = parseInt(nextCursor) + 1; 
      const endId = posts[endPosition]._id;
      const hasMoreposts = posts.length > limit ? true : false;
      return {
        startId,
        endId,
        hasMoreposts,
        startCursor,
        posts:
          posts.length > limit
            ? posts.slice(startPosition, endPosition + 1)
            : posts,
        endCursor,
      };
    }
    return {};
  }

  //should be created in future
  async createArticlePost() {}
  async createCelebrationPost() {}
}
