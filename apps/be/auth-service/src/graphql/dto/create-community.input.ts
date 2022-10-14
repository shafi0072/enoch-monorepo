import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCommunityInput {
  @Field()
  communityName: string;

  @Field()
  communityDescription: string;
}
