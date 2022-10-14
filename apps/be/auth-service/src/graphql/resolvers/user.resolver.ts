import { UseGuards } from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from 'src/graphql/models/user.model';
import { MentionResult } from 'src/graphql/models/mentionResult.model';
import { AuthService } from 'src/services/auth.service';
import UserService from 'src/services/user.service';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import AllowedUserService from 'src/services/allowedUsers.service';
import { TwoFAAuthGuard } from 'src/guards/two-fa-auth.guard';
import { CountryCodes } from '../dto/countries-code';
import { IndustryModel } from '../models/industry.model';
import OnboardingService from 'src/services/onboarding.service';
import { Industry } from 'src/db/schemas/industry.schema';
import FollwerService from 'src/services/follwers.service';
import { Follower } from '../models/follow';
import { SUCCESS_MESSAGE } from '../../constant.json';
import { AddUserJobExperience } from '../dto/add-user-experience.input';
import { MentionQuery } from '../dto/mention-query.input';

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private allowedUserService: AllowedUserService,
    private onboardingservice: OnboardingService,
    private followerService: FollwerService,
  ) {}

  @Query(() => User)
  // @UseGuards(GqlAuthGuard)
  getUser(@Args('id') id: string) {
    return this.userService.getUser(id);
  }
  @UseGuards(TwoFAAuthGuard)
  @Query(() => [User])
  async getUsers(@Context() { user }) {
    return await this.userService.getUsers();
  }

  @UseGuards(TwoFAAuthGuard)
  @Query(() => [User])
  async getSuggestedUsers(@Context() { user }) {
    return await this.followerService.getSuggestedUsers(user);
  }

  @Mutation(() => User)
  async addInterests(
    @Args('id') id: string,
    @Args({ name: 'interest', type: () => [String] }) interest: string[],
  ) {
    return await this.userService.addInterests(id, interest);
  }

  @Mutation(() => User || Error)
  async createUser(@Args('createUserData') createUserData: CreateUserInput) {
    return this.userService.createUser(createUserData, 'Enoch');
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserData') updateUserData: UpdateUserInput) {
    return this.userService.updateUser(updateUserData);
  }

  @Mutation(() => User)
  deleteUser(@Args('id') id: string) {
    return this.userService.deleteUser(id);
  }
  @UseGuards(TwoFAAuthGuard)
  @Query(() => String)
  async meResolver(@Args('id') id: string, @Context() { user }) {
    console.log('user', user);
    return 'Hello-world';
  }

  @Query(() => [CountryCodes])
  getAllCountriesWithCountryCode() {
    return this.userService.fetchAllCountriesAndCountryCodes();
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => Follower)
  async addTofollowers(@Context() { user }, @Args('id') id: string) {
    return {
      ...(await this.followerService.addToFollowers(user, id)).toJSON(),
      message: SUCCESS_MESSAGE.SUCCESFULLY_FOLLOWED,
    };
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => String)
  async unfollowUser(@Context() { user }, @Args('id') id: string) {
    return await this.followerService.unfollowUser(user, id);
  }

  @ResolveField(() => IndustryModel)
  async industryType(@Parent() user: User) {
    const { industryType } = user;
    return this.onboardingservice.fetchIndustryCategoryByIndustryId(
      industryType,
    );
  }

  @ResolveField(() => Industry)
  async interests(@Parent() user: User) {
    const { interests } = user;
    return this.onboardingservice.fetchInterestsByIndustryId(interests);
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => User)
  async addUserExperince(
    @Context() { user },
    @Args('UserExperience') userExperience: AddUserJobExperience,
  ) {
    return await this.userService.addUserExperience(user, userExperience);
  }

  @UseGuards(TwoFAAuthGuard)
  @Query(() => [MentionResult])
  async mentionSearch(
    @Context() { user },
    @Args('mentionQuery') mentionQuery: MentionQuery,
  ): Promise<MentionResult[]> {
    return this.userService.searchMention(user, mentionQuery);
  }
}
