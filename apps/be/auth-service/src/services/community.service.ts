import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBService from './db.service';
import { Community, CommunityDocument } from '../db/schemas/community.schema';
import { User } from 'src/db/schemas/user.schema';

@Injectable()
export default class CommunityService extends DBService {
  prefix = 'ci';
  idField = 'communityId';
  constructor(
    @InjectModel(Community.name)
    private readonly communityModel: Model<CommunityDocument>,
  ) {
    super(communityModel);
  }

  async getSuggestedCommunities(user: User) {
    return await this.communityModel.aggregate([
      {
        $project: {
          _id: 1,
          communityName: 1,
          communityDescription: 1,
          followersCount: 1,
          isJoined: {
            $cond: {
              if: {
                $in: [{ $toObjectId: '$_id' }, user?.communities || []],
              },
              then: true,
              else: false,
            },
          },
        },
      },
    ]);
  }
}
