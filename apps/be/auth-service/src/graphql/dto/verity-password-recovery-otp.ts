import { IsJWT, IsNotEmpty, Length, MinLength } from 'class-validator';
import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class VerifyOtpForPasswordRecoveryArgs {
  @Field()
  @IsNotEmpty()
  @IsJWT()
  token: string;

  @Field()
  @IsNotEmpty()
  @Length(6)
  OTP: string;
}
