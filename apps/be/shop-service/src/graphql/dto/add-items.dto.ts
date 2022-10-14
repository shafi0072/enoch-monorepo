import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class AddItemDtoGql {
  @Field((type) => ID)
  bannerId: string;

  @Field((type) => ID)
  shopId: string;

  @Field((type) => ID)
  nftId: string;

  @Field({ nullable: true, defaultValue: false })
  isPinned?: boolean;
}
