import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Community, CommunitySchema } from 'src/db/schemas/community.schema';
import { communities } from 'src/shared/communities.data';

@Injectable()
export class CommunitySeeder implements Seeder {
  constructor(
    @InjectModel(Community.name) private readonly community: Model<Community>,
  ) {}

  async seed(): Promise<any> {
    return this.community.insertMany(communities);
  }

  async drop(): Promise<any> {
    return this.community.deleteMany({});
  }
}

export const CommunitySeederSchema = {
  name: Community.name,
  schema: CommunitySchema,
};
