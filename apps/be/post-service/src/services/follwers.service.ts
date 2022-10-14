import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { Connection, ClientSession } from 'mongoose';
import { Cache } from 'cache-manager';
import { Followers, FollowersDocument } from 'src/db/schemas/followers.schema';
import UserService from './user.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGE } from '../constant.json';
import { UserFollowed } from 'src/events/user.events';
import RedisService from './redis.service';

@Injectable()
export default class FollwerService {
  constructor(
    @InjectModel(Followers.name)
    private readonly followersModel: Model<FollowersDocument>,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectConnection() private connection: Connection,
  ) {}

  async findFollowerById(followerId, user) {
    return await this.followersModel
      .findOne({ followee: followerId, follower: user._id })
      .exec();
  }

  async updateUsersFollowersCount(
    follower,
    followee,
    session: ClientSession | null = null,
    value,
  ) {
    await this.userService.addOrSubstractFollowingCount(follower, null, value); //session
    await this.userService.addOrSubstractFollowerCount(followee, null, value); //session
  }
  async addToFollowers(user: any, followerId: string) {
    const alreadyFollowing = await this.findFollowerById(followerId, user);
    if (alreadyFollowing) {
      throw new Error(ERROR_MESSAGES.ALREADY_FOLLOWING);
    }
    const follower = await new this.followersModel({
      followee: followerId,
      follower: user._id,
    });
    const newFollower = await follower.save(); //{ session }
    if (!newFollower) {
      throw new NotFoundException();
    }
    await this.updateUsersFollowersCount(
      newFollower.follower,
      newFollower.followee,
      null,
      1,
    );

    this.redisService.cacheAddFollower(newFollower);
    return newFollower;
  }

  async unfollowUser(user: any, followeeId: string) {
    const alreadyFollowing = await this.findFollowerById(followeeId, user);
    if (!alreadyFollowing) throw new Error(ERROR_MESSAGES.NOT_FOLLOWING);
    const deleted = await alreadyFollowing.remove();
    if (!deleted)
      throw new Error(
        'some error in unfollowing the user,please try again later',
      );

    await this.updateUsersFollowersCount(
      deleted?.follower,
      deleted?.followee,
      null,
      -1,
    );

    this.redisService.cacheRemoveFollwer(alreadyFollowing);
    return SUCCESS_MESSAGE.SUCCESSFULLY_UNFOLLOWED;
  }

  async getIdOfMyFollowings(id: string) {
    const followers = await this.followersModel.aggregate([
      { $match: { follower: id } },
      {
        $group: {
          _id: null,
          myFollowings: { $push: { $toString: '$followee' } },
        },
      },
    ]);
    return followers;
  }

  async getSuggestedUsers(user) {
    const myFollowees = await this.getIdOfMyFollowings(user._id);
    if (!myFollowees.length) {
      return await this.userService.getUsers();
    }
    return await this.userService.getSuggestedUsers(
      myFollowees[0]?.myFollowings,
    );
  }
}
