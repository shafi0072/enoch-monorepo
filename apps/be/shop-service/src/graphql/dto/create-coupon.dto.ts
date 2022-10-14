import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCouponDtoGql {
  @Field()
  name: string;

  @Field()
  discount: number;

  @Field({ nullable: true })
  amount?: number;

  @Field({ nullable: true })
  expiryDate?: string;
}
