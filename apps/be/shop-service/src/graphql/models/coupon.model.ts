import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Coupon {
  @Field((type) => ID)
  _id: string;

  @Field()
  name: string;

  @Field((type) => Int)
  discount: number;

  @Field(() => Int, { nullable: true })
  amount?: number;

  @Field({ nullable: true })
  expiryDate?: string;
}
