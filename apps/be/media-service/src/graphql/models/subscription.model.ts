import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Subscription {
  @Field((type) => ID)
  _id: string;

  @Field({ nullable: true })
  enableRewards: boolean;

  @Field(() => [String], { nullable: true })
  enableBadges?: string[];

  @Field(() => [String], { nullable: true })
  enableEmotes?: string[];

  @Field(() => [String], { nullable: true })
  enableGifts?: string[];

  @Field({ nullable: true })
  price?: number;

  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  endDate?: string;

  @Field((type) => ID)
  userId: string;

  @Field((type) => ID)
  mediaId: string;
}
