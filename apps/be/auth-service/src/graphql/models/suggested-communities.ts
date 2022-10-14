import { Field, ObjectType } from '@nestjs/graphql';
import { Community } from '../dto/community';

@ObjectType()
export class SuggestedCommunities {
  @Field(() => [Community], { nullable: true })
  communities: Community[];

  @Field(() => [String])
  joinedCommunitesArray: string[];
}
