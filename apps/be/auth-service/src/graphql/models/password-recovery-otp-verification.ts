import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class VerifyOtpResponse {
  @Field({ nullable: true })
  accessToken?: string;

  @Field()
  message?: string;
}
