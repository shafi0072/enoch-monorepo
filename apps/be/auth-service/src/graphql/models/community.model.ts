import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CommunityModel {
  @Field()
  _id: string;

  @Field()
  communityName: string;

  @Field()
  communityDescription: string;

  @Field()
  followersCount: string;
}
