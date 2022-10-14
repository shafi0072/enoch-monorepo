import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { UserDocument, User } from 'src/db/schemas/user.schema';
import { UserInterface } from 'src/shared/interfaces/user-interface';

@Injectable()
export default class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {}

  async createUser(createUserData: UserInterface) {
    const newUser = new this.userModel({ ...createUserData });
    return newUser.save();
  }

  async getUserByEmail(email: string): Promise<User> {
    const filter = {
      email: email,
    };
    return await this.userModel.findOne(filter);
  }
}
