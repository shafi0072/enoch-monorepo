import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { CurrentUser } from 'src/decorator/current-user.decorator';
import { NewsChannel } from '../dto/news-channel';
import NewsChannelService from 'src/services/news-channel.service';
import { CreateNewsChannelInput } from '../dto/create-news-channel.input';
import { TwoFAAuthGuard } from 'src/guards/two-fa-auth.guard';
import { SuggestedNewsChannels } from '../models/suggested-newschannel.model';

@Resolver(() => NewsChannel)
export class NewsChannelResolver {
  constructor(private service: NewsChannelService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => NewsChannel)
  async createNewsChannel(
    @CurrentUser() user,
    @Args('newsChannel') body: CreateNewsChannelInput,
  ) {
    return await this.service.create(body);
  }

  @Query(() => [NewsChannel])
  async getAllNewsChannels() {
    return await this.service.find();
  }

  @UseGuards(TwoFAAuthGuard)
  @Query(() => SuggestedNewsChannels)
  async getsuggestedNewsChannel(@Context() { user }) {
    const newsLetters = await this.service.getSuggestedNewsLetters(user);
    return {
      newsChannels: newsLetters || [],
      subscribedChannels: user?.newsChannels || [],
    };
  }
}
