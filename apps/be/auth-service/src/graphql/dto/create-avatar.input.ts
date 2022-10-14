import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAvatarInput {
  @Field()
  avatarURL: string;
}
