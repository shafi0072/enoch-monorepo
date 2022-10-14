import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ShopItems } from './shop.items.model';

@ObjectType()
export class Shop {
  @Field((type) => ID)
  _id: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => [ShopItems])
  items: Array<ShopItems>;

  @Field((type) => ID)
  userId: string;
}
