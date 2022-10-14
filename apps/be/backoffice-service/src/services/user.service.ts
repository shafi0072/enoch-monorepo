import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/db/schemas/users.shema';
import DBService from './db.service';

@Injectable()
export default class UserService extends DBService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {
    super(userModel);
  }

  async createUser(user: User) {
    const newUser = new this.userModel(user);
    return await newUser.save();
  }
}
