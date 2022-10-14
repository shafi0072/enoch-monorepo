import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AllowerUserModel {
  @Field(() => String)
  _id: string;

  @Field()
  email?: string;

  @Field()
  hashedPassKey: string;
}
