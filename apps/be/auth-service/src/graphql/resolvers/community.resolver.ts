import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { Community } from '../dto/community';
import IndustryService from 'src/services/industry.service';
import { CreateIndustryInput } from '../dto/create-industry.input';
import CommunityService from 'src/services/community.service';
import { CreateCommunityInput } from '../dto/create-community.input';
import { TwoFAAuthGuard } from 'src/guards/two-fa-auth.guard';
import { SuggestedCommunities } from '../models/suggested-communities';

@Resolver(() => Community)
export class CommunityResolver {
  constructor(private service: CommunityService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Community)
  async createCommunity(
    @CurrentUser() user,
    @Args('community') body: CreateCommunityInput,
  ) {
    return await this.service.create(body);
  }

  @Query(() => [Community])
  async getAllCommunities() {
    return await this.service.find();
  }

  @UseGuards(TwoFAAuthGuard)
  @Query(() => SuggestedCommunities)
  async getSuggestedCommunities(@Context() { user }) {
    const communities = await this.service.getSuggestedCommunities(user);
    return {
      communities,
      joinedCommunitesArray: user?.communities || [],
    };
  }
}
