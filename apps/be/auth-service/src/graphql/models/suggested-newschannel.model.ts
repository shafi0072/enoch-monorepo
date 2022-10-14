import { Field, Int, ObjectType } from '@nestjs/graphql';
import { NewsChannel } from '../dto/news-channel';

@ObjectType()
export class SuggestedNewsChannels {
  @Field((type) => [NewsChannel], { nullable: true })
  newsChannels?: NewsChannel[];

  @Field((type) => [String], { nullable: true })
  subscribedChannels?: string[];
}
