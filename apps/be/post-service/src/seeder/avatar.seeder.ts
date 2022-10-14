import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Avatar, AvatarSchema } from 'src/db/schemas/avatar.schema';
import { generateMongooseId } from 'src/utils';
import { AbstractSeeder } from './AbstractSeeder';

const dummyAvatars = [
  {
  _id: generateMongooseId('5DE3242F241D9774141119F1'),
  avatarId: 'av-111',
  avatarURL: 'Some Randon URL'
  },
];

@Injectable()
export class AvatarSeeder extends AbstractSeeder {
  data: any[] = dummyAvatars;
  constructor(
    @InjectModel(Avatar.name) private readonly avatar: Model<Avatar>
  ) {
    super(avatar);
  }
}

export const AvatarSeederSchema = { name: Avatar.name, schema: AvatarSchema }
