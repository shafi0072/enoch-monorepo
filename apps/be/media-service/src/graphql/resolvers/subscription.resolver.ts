import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { TwoFAAuthGuard } from 'src/guards/two-fa-auth.guard';
import SubscriptionService from 'src/services/subscription.service';
import { BuySubscriptionInput } from '../dto/buy-subscription-input';
import { Subscription } from '../models/subscription.model';

@Resolver(() => Subscription)
export class SubscriptionResolver {
  constructor(private subscriptionService: SubscriptionService) {}

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => Subscription)
  buySubscription(
    @Context() user,
    @Args('buySubscriptionInput') input: BuySubscriptionInput,
  ) {
    return this.subscriptionService.buySubscription({
      enableRewards: input.enableRewards,
      price: input.price,
      mediaId: input.mediaId,
      userId: user.user._id,
    });
  }
}
