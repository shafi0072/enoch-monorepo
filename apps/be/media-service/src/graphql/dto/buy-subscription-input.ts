import { Field, InputType, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class BuySubscriptionInput {
  @Field()
  enableRewards?: boolean;

  @Field()
  @IsNotEmpty()
  price: number;

  @Field((type) => ID, { nullable: true })
  mediaId: string;
}
