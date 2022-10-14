import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

@ArgsType()
export class PhoneNumber {
  @Field()
  @IsNotEmpty()
  countryCode: string;

  @Field()
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}
