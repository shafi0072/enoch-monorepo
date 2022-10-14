import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { IORedisKey } from 'src/redis/redis.module';
import { User } from 'src/db/schemas/user.schema';
import { PostDocument } from 'src/db/schemas/post.schema';

@Injectable()
export default class RedisService {
  constructor(@Inject(IORedisKey) private readonly redisClient: Redis) {}

  async addPostToFollowerTimeline(user: User, post: PostDocument) {
    const timelineKey = `follower.${user._id}`;
    const timelines = await this.redisClient.smembers(timelineKey);
    const pipeline = this.redisClient.pipeline();
    for (const timeline of timelines) {
      let timelineKeyVal = `timeline.${timeline}`;
      pipeline.zadd(timelineKeyVal, Date.now(), post._id);
    }
    let timelineKeyValCurrentUser = `timeline.${user._id}`;
    pipeline.zadd(timelineKeyValCurrentUser, Date.now(), post._id);
    const results = await pipeline.exec();
    return results;
  }

  async getPostToFollowerTimeline(user: User, limit: any, offset: any) {
    if (offset != '0') {
      offset = offset * limit - limit;
    } else {
      offset = '0';
    }
    const timelineKey = `timeline.${user._id}`;
    return await this.redisClient.zrange(timelineKey, offset, limit);
  }

  async cacheAddFollower(followerModel: any) {
    const followee = followerModel.followee.toString();
    const follower = followerModel.follower.toString();
    const followeeKey = `followee.${follower}`;
    this.redisClient.sadd(followeeKey, followee.toString());
    const followerKey = `follower.${followee}`;
    this.redisClient.sadd(followerKey, follower.toString());
  }

  async cacheRemoveFollwer(followerModel: any) {
    const followee = followerModel.followee.toString();
    const follower = followerModel.follower.toString();
    const followeeKey = `followee.${follower}`;
    const followerKey = `follower.${followee}`;
    this.redisClient.spop(followeeKey);
    this.redisClient.spop(followerKey);
  }
}
