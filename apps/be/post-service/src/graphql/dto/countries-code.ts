import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class CountryCodes {
  @Field()
  name: string;

  @Field()
  dial_code: string;

  @Field()
  code: string;
}
