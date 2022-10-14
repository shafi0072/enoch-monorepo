import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/current-user-decorator';
import ShopService from 'src/services/shop.service';
import { CreateShopDtoGql } from '../dto/create-shop.dto';

import { Shop } from '../models/shop.model';
import { ShopItems } from '../models/shop.items.model';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { PinItemDtoGql } from '../dto/pin-item.dto';
import { AddItemDtoGql } from '../dto/add-items.dto';

@Resolver(() => Shop)
export class ShopResolver {
  constructor(private readonly shopService: ShopService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Shop)
  createShop(
    @CurrentUser() user,
    @Args('createShopInput') input: CreateShopDtoGql,
  ) {
    return this.shopService.createShop({
      description: input.description,
      userId: user.id,
    });
  }

  @Mutation(() => ShopItems)
  pinShopItem(@Args('pinItemInput') input: PinItemDtoGql) {
    return this.shopService.pinItem({
      itemId: input.itemId,
      isPinned: input.isPinned,
    });
  }

  @Mutation(() => String)
  deleteItem(@Args('itemId') itemId: string) {
    return this.shopService.deleteItem(itemId);
  }

  @Mutation(() => [ShopItems])
  addItems(
    @Args({ name: 'addItemInput', type: () => [AddItemDtoGql] })
    input: AddItemDtoGql[],
  ) {
    return this.shopService.addItems(input);
  }

  @Query(() => [Shop])
  shops(@Args('userId') userId: string) {
    return this.shopService.getShop(userId);
  }
}
