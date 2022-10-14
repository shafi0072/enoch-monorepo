import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBService from './db.service';
import {
  NewsChannel,
  NewsChannelDocument,
} from '../db/schemas/newsChannel.schema';
import { User } from 'src/db/schemas/user.schema';

@Injectable()
export default class NewsChannelService extends DBService {
  prefix = 'nc';
  idField = 'channelId';
  constructor(
    @InjectModel(NewsChannel.name)
    private readonly newsChannel: Model<NewsChannelDocument>,
  ) {
    super(newsChannel);
  }

  async getSuggestedNewsLetters(user: User) {
    return await this.newsChannel.aggregate([
      {
        $project: {
          _id: 1,
          channelDescription: 1,
          channelName: 1,
          isSubscribed: {
            $cond: {
              if: {
                $in: [{ $toObjectId: '$_id' }, user?.newsChannels || []],
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
