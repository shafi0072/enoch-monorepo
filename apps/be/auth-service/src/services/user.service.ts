import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { generate } from 'short-uuid';
import { isNotEmpty } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { ClientSession } from 'mongoose';
import { UserDocument, User } from 'src/db/schemas/user.schema';
import { CreateUserInput } from 'src/graphql/dto/create-user.input';
import { ERROR_MESSAGES } from '../constant.json';
import { AddphoneNumberAndOtp } from 'src/shared/interfaces/otp-interface';
import { countryAndCodes } from '../shared/countries';
import DBService from './db.service';
import { MentionQuery } from 'src/graphql/dto/mention-query.input';
import { MentionResult } from 'src/graphql/models/mentionResult.model';

@Injectable()
export default class UserService extends DBService {
  prefix = 'user';
  idField = 'userId';
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly configService: ConfigService,
  ) {
    super(userModel);
  }

  async createUser(
    createUserData: CreateUserInput,
    signUpType: string,
  ): Promise<User> {
    const user = {
      ...createUserData,
      userId: `user_${generate()}`,
      isDeleted: false,
      signUpType,
    };
    if (isNotEmpty(createUserData.password)) {
      user.password = await bcrypt.hash(
        createUserData.password,
        parseInt(this.configService.get('SALT_TO_ROUNDS')),
      );
    }
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async updateUser(updateUserData): Promise<User> {
    const { id } = updateUserData;
    return await this.userModel.findByIdAndUpdate(
      id,
      { ...updateUserData },
      { new: true },
    );
  }

  async addUserExperience(user, userExperience) {
    const { _id } = user;
    return await this.userModel
      .findByIdAndUpdate(
        _id,
        { $push: { userJobExperience: userExperience } },
        { new: true },
      )
      .lean()
      .exec();
  }

  async getUser(id: string): Promise<User> {
    const filter = {
      $or: [{ isDeleted: { $exists: false } }, { isDeleted: false }],
      _id: id,
    };
    return await this.userModel.findOne(filter).populate('interests').exec();
  }

  async getUserByEmail(email: string): Promise<User> {
    const filter = {
      $or: [{ isDeleted: { $exists: false } }, { isDeleted: false }],
      email: email,
    };
    return await this.userModel.findOne(filter);
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<User> {
    const filter = {
      $or: [{ isDeleted: { $exists: false } }, { isDeleted: false }],
      phoneNumber: phoneNumber,
    };
    return await this.userModel.findOne(filter);
  }

  async getUsers(): Promise<User[]> {
    const filter = {
      $or: [{ isDeleted: { $exists: false } }, { isDeleted: false }],
    };
    return await this.userModel.find(filter).populate('interests').exec();
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, { isDeleted: true });
  }

  async addOrSubstractFollowerCount(
    id,
    session: ClientSession | null = null,
    value,
  ): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      id,
      {
        $inc: { followersCount: value },
      },
      // { session },
    );
  }

  async addOrSubstractFollowingCount(
    id,
    session: ClientSession | null = null,
    value,
  ): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      id,
      {
        $inc: { followingCount: value },
      },
      // { session },
    );
  }

  async getUserByUserId(userId: string): Promise<User> {
    return await this.userModel.findOne({ userId: userId });
  }

  async select2FAmethod(_2FAType: string, id: string): Promise<User> {
    return this.userModel.findOneAndUpdate(
      { userId: id },
      {
        _2FAAuthenticationType: _2FAType,
      },
      {
        new: true,
      },
    );
  }

  async updateUserPassword(userId: string, password: string): Promise<User> {
    let newPassword: string;
    if (isNotEmpty(password)) {
      newPassword = await bcrypt.hash(
        password,
        parseInt(this.configService.get('SALT_TO_ROUNDS')),
      );
    }
    return await this.userModel.findOneAndUpdate(
      { userId: userId },
      {
        password: newPassword,
      },
      {
        new: true,
      },
    );
  }

  async addOtpAndExpiry({
    id,
    otp,
    otpExpiryTime,
    phoneNumber,
    countryCode,
  }: AddphoneNumberAndOtp): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { userId: id },
      {
        otp,
        otpExpiryTime,
        phoneNumber,
        countryCode,
      },
      {
        new: true,
      },
    );
  }
  async updateOtpSentStatus(id: string, otpSentStatus: string): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { userId: id },
      {
        otpSentStatus,
      },
      {
        new: true,
      },
    );
  }

  async activateUserEmail(email: string): Promise<User> {
    const filter = { email };
    const update = { isEmailVerified: true };

    return await this.userModel.findOneAndUpdate(filter, update, { new: true });
  }

  fetchAllCountriesAndCountryCodes() {
    return countryAndCodes;
  }

  async updateUserChangeNumber(updateUserData): Promise<User> {
    const { id } = updateUserData;
    return await this.userModel.findByIdAndUpdate(
      id,
      { ...updateUserData },
      { new: true },
    );
  }
  async addInterests(id, interest): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(
        { _id: id },
        { $addToSet: { interests: interest } },
        { new: true },
      )
      .populate('interests');
  }
  async getSuggestedUsers(followeeList: any) {
    return await this.userModel
      .aggregate([
        {
          $project: {
            username: 1,
            _id: 1,
            bio: 1,
            country: 1,
            isFollowing: {
              $cond: {
                if: { $in: [{ $toString: '$_id' }, followeeList] },
                then: true,
                else: false,
              },
            },
          },
        },
      ])
      .exec();
  }

  async searchMention(
    user: User,
    mentionQuery: MentionQuery,
  ): Promise<MentionResult[]> {
    const { query, maxResults = 30 } = mentionQuery;
    const searchMentions = await this.Model.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { username: { $regex: query, $options: 'i' } },
      ],
    }).limit(maxResults);

    return searchMentions;
  }
}
