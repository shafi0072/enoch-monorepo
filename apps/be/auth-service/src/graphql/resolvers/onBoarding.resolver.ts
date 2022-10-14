import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { User } from 'src/graphql/models/user.model';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import UserService from 'src/services/user.service';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { AccountType } from 'src/shared/enums/account-type';
import { OnBoardingScreen } from 'src/shared/enums/onboarding-screen';
import OnboardingService from 'src/services/onboarding.service';
import { Community } from '../dto/community';
import { NewsChannel } from '../dto/news-channel';
import { OnboardingInput } from '../dto/onboarding.input';
import { TwoFAAuthGuard } from 'src/guards/two-fa-auth.guard';
import { ClientKafka } from '@nestjs/microservices';

@Resolver(() => User)
export class OnboardingResolver {
  constructor(
    @Inject('KAFKA_SERVICE') private kakfaClient: ClientKafka,
    private userService: UserService,
    private onboardingService: OnboardingService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async setAccountType(
    @CurrentUser() user,
    @Args('accountType') accountType: AccountType,
  ) {
    const nextOnBoardingScreen = OnBoardingScreen.FillPersonalInformation;

    const updateUserObj = {
      accountType,
      activeOnBoardingScreen: nextOnBoardingScreen,
    };

    return await this.userService.updateUser({
      id: user._id,
      ...updateUserObj,
    });
  }

  @Query(() => [Community])
  async getAllCommunity() {
    return await this.onboardingService.fetchAllCommunities();
  }

  @Query(() => [NewsChannel])
  async getAllNewsChannel() {
    return await this.onboardingService.fetchAllNewsChannel();
  }

  @Query(() => [User])
  async getSuggestedFollowee() {
    return await this.userService.find();
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => User)
  async addOnboardingDetails(
    @Context() { user },
    @Args('onboardingInput') onboardingInput: OnboardingInput,
  ): Promise<User | Error> {
    console.log(
      'active onboardingscreen',
      onboardingInput.activeOnBoardingScreen,
    );
    const isOnboardingCompleted =
      onboardingInput.activeOnBoardingScreen ==
      OnBoardingScreen.WelcomeScreenAfterOnboarding
        ? true
        : false;
    const updatedUser = await this.userService
      .update(user, { ...onboardingInput, isOnboardingCompleted })
      .populate('followee')
      .populate('communities')
      .populate('newsChannels');

    if (isOnboardingCompleted) {
      this.kakfaClient.emit('create-user', { ...updatedUser.toJSON() });
    }

    return {
      ...updatedUser.toJSON(),
      selectedInterests: updatedUser?.interests,
    };
  }
}
