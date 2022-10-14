import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Follower {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field(() => String, { nullable: true })
  followee?: string;

  @Field(() => String, { nullable: true })
  follower?: string;

  @Field(() => String, { nullable: true })
  message?: string;
}
