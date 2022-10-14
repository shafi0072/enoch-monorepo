import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBService from './db.service';
import { Avatar, AvatarDocument } from '../db/schemas/avatar.schema';

@Injectable()
export default class AvatarService extends DBService {
  prefix = 'av';
  idField = 'avatarId';
  constructor(
    @InjectModel(Avatar.name) private readonly industry: Model<AvatarDocument>,
  ) {
    super(industry);
  }
}
