import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNewsChannelInput {
  @Field()
  channelName: string;

  @Field()
  channelDescription: string;
}
