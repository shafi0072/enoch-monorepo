import { Redis } from 'ioredis';
import * as redis from 'redis-mock';

import { User } from 'src/db/schemas/user.schema';
import { PostDocument } from 'src/db/schemas/post.schema';
import RedisService from './redis.service';

describe('RedisService', () => {
  let redisService: RedisService;
  const redisClient = redis.createClient() as Redis;

  beforeEach(() => {
    redisService = new RedisService(redisClient);
  });

  describe('addPostToFollowerTimeline', () => {
    it('should add post to user!', async () => {
      const user = { _id: '1' } as User;
      const post = { _id: '2' } as PostDocument;
      await redisService.addPostToFollowerTimeline(user, post);
      const followersTimeline = await redisService.getPostToFollowerTimeline(
        user,
        1,
        1,
      );
      console.log({ followersTimeline });
    });
  });
});
