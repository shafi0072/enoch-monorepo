import { Field, InputType, ID } from '@nestjs/graphql';

@InputType()
export class CreateShopDtoGql {
  @Field({ nullable: true })
  description?: string;
}
