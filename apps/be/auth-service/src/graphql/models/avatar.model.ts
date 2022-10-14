import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Avatar {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field(() => String)
  avatarId?: string;

  @Field(() => String)
  avatarURL?: string;
}
