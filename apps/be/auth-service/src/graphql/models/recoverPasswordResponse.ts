import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RecoverPasswordResponse {
  @Field({ nullable: false })
  email?: string;

  @Field()
  _2FAEnabled: boolean;

  @Field()
  _2FAAuthenticationType: string;

  @Field()
  accessToken?: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  countryCode: string;
}
