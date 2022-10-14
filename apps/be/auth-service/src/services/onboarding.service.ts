import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Community } from 'src/db/schemas/community.schema';
import { Industry } from 'src/db/schemas/industry.schema';
import { NewsChannel } from 'src/db/schemas/newsChannel.schema';
import { User } from 'src/db/schemas/user.schema';
import { industries } from 'src/shared/industry-category.data.';
import { newsChannels } from 'src/shared/news-channels.data';
import { communities } from '../shared/communities.data';
import UserService from './user.service';
@Injectable()
export default class OnboardingService {
  constructor(
    private readonly userService: UserService,
    @InjectModel(Industry.name) private readonly industry: Model<Industry>,
    @InjectModel(Community.name) private readonly community: Model<Community>,
    @InjectModel(NewsChannel.name)
    private readonly newsChannel: Model<NewsChannel>,
  ) {}
  fetchAllCommunities() {
    return this.community.find({});
  }

  fetchAllIndustryCategory() {
    return this.industry.find({});
  }

  fetchAllNewsChannel() {
    return this.newsChannel.find({});
  }

  async fetchIndustryCategoryByIndustryId(industryId) {
    return await this.industry.findOne({ _id: industryId });
  }

  async fetchInterestsByIndustryId(interestIds) {
    return await this.industry.find({ _id: { $in: interestIds } });
  }

  async fetchCommunitiesByCommunityId(communityIds) {
    return await this.community.find({ _id: { $in: communityIds } });
  }

  async fetchNewsChannelByChannelId(channelIds) {
    return await this.newsChannel.find({ _id: { $in: channelIds } });
  }

  async saveIndustryType(user, onboardingInput) {
    const { industryType, activeOnBoardingScreen } = onboardingInput;
    const updateUserObj = {
      industryType,
      activeOnBoardingScreen,
    };
    return await this.userService.updateUser({
      id: user._id,
      ...updateUserObj,
    });
  }

  async saveInterestType(user, onboardingInput) {
    const { interests, activeOnBoardingScreen } = onboardingInput;
    const updateUserObj = {
      interests,
      activeOnBoardingScreen,
    };
    return await this.userService.updateUser({
      id: user._id,
      ...updateUserObj,
    });
  }

  async saveCommunities(user, onboardingInput) {
    const { community, activeOnBoardingScreen } = onboardingInput;
    const updateUserObj = {
      community,
      activeOnBoardingScreen,
    };
    return await this.userService.updateUser({
      id: user._id,
      ...updateUserObj,
    });
  }

  async saveNewsChannelSubscribed(user, onboardingInput) {
    const { subscribedNewsChannel, activeOnBoardingScreen } = onboardingInput;
    const updateUserObj = {
      subscribedNewsChannel,
      activeOnBoardingScreen,
    };
    return await this.userService.updateUser({
      id: user._id,
      ...updateUserObj,
    });
  }

  async saveTermsAndConditionAggrement(user, onboardingInput) {
    const { isAgreedToOnboardingTerms, activeOnBoardingScreen } =
      onboardingInput;
    const updateUserObj = {
      isAgreedToOnboardingTerms,
      activeOnBoardingScreen,
    };
    return await this.userService.updateUser({
      id: user._id,
      ...updateUserObj,
    });
  }

  async saveUsersToFollow(user, onboardingInput) {}
}
