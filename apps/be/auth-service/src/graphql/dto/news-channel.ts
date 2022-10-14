import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class NewsChannel {
  @Field({ nullable: true })
  _id?: string;

  @Field({ nullable: true })
  channelId?: string;

  @Field({ nullable: true })
  channelName?: string;

  @Field({ nullable: true })
  channelDescription?: string;

  @Field({ nullable: true })
  isSubscribed?: boolean;
}
