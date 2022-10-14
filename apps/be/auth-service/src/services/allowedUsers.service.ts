import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import {
  AllowedUserDocument,
  AllowedUser,
} from 'src/db/schemas/allowedUsers.schema';
import { ERROR_MESSAGES, SUCCESS_MESSAGE } from '../constant.json';

@Injectable()
export default class AllowedUserService {
  constructor(
    @InjectModel(AllowedUser.name)
    private readonly allowedUserModel: Model<AllowedUserDocument>,
    private readonly configService: ConfigService,
  ) {}

  async createAllowedUser(
    email: string,
    hashedPassKey: string,
    isEmailSent: boolean,
  ): Promise<AllowedUser | null> {
    const existingUser: any = await this.allowedUserModel.findOne({
      email: email,
    });

    if (existingUser) {
      existingUser.hashedPassKey = hashedPassKey;
      existingUser.isEmailSent = isEmailSent;
      return await existingUser.save();
    }
    const newUser = new this.allowedUserModel({
      email: email.toLowerCase(),
      hashedPassKey,
      isEmailSent,
    });

    return await newUser.save();
  }

  async comparePassKey(
    email: string,
    hashedPassKey: string,
  ): Promise<AllowedUser | null> {
    return await this.allowedUserModel.findOne({
      email,
      hashedPassKey,
    });
  }

  async getPasskeyByEmail(email: string): Promise<AllowedUser | null> {
    try {
      return this.allowedUserModel
        .findOne({ email: email })
        .select({ hashedPassKey: 1, _id: 0 });
    } catch (e) {
      throw new Error(ERROR_MESSAGES.ALLOWED_USER_NOT_FOUND);
    }
  }
}
