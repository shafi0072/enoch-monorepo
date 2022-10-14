import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class Community {
  @Field()
  _id: string;

  @Field()
  communityId: string;

  @Field()
  communityName: string;

  @Field()
  communityDescription: string;

  @Field()
  followersCount: string;

  @Field({ nullable: true })
  isJoined?: boolean;
}
