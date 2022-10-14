import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmailVerificationResponse {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  isEmailVerified?: boolean;

  @Field()
  message: string;

  @Field()
  accessToken: string;
}
