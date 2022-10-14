import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MentionResult {
  @Field(() => String)
  _id: string;

  @Field({})
  firstName: string;

  @Field({})
  lastName: string;

  @Field({})
  username: string;

  @Field({})
  avatar: string;
}
