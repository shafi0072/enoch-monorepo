import { AvatarSeeder, AvatarSeederSchema } from './avatar.seeder';
import { CommunitySeeder, CommunitySeederSchema } from './community.seeder';
import { IndustrySeeder, IndustrySeederSchema } from './industry.seeder';
import {
  NewsChannelSeeder,
  NewsChannelSeederSchema,
} from './newsChannel.seeder';

export const seeders = [
  CommunitySeeder,
  IndustrySeeder,
  NewsChannelSeeder,
  AvatarSeeder,
];

export const seederSchemas = [
  CommunitySeederSchema,
  IndustrySeederSchema,
  NewsChannelSeederSchema,
  AvatarSeederSchema,
];
