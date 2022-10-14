import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { newsChannels } from 'src/shared/news-channels.data';
import { NewsChannel, NewsChannelSchema } from 'src/db/schemas/newsChannel.schema';

@Injectable()
export class NewsChannelSeeder implements Seeder {
  constructor(
    @InjectModel(NewsChannel.name)
    private readonly newsChannel: Model<NewsChannel>,
  ) {}

  async seed(): Promise<any> {
    return this.newsChannel.insertMany(newsChannels);
  }

  async drop(): Promise<any> {
    return this.newsChannel.deleteMany({});
  }
}

export const NewsChannelSeederSchema = {name: NewsChannel.name, schema: NewsChannelSchema};
