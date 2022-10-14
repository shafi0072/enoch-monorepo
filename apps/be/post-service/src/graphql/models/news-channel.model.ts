import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class NewsChannelModel {
  @Field()
  _id: string;

  @Field()
  channelName: string;

  @Field()
  channelDescription: string;
}
