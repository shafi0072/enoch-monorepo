import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ShopItems {
  @Field()
  bannerId: string;

  @Field((type) => ID)
  nftId: string;

  @Field((type) => ID)
  shopId: string;

  @Field({ nullable: true, defaultValue: false })
  isPinned: boolean;
}
