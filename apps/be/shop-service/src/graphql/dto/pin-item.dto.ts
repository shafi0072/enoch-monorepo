import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class PinItemDtoGql {
  @Field((type) => ID)
  itemId: string;

  @Field()
  isPinned: boolean;
}
