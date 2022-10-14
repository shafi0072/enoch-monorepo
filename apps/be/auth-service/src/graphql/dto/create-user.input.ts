import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @IsNotEmpty()
  @Field()
  @Length(1, 255)
  password?: string;

  @IsNotEmpty()
  @Field()
  @Length(1, 255)
  repeatPassword?: string;

  @IsNotEmpty()
  @Field()
  phoneNumber?: string;

  @IsNotEmpty()
  @Field()
  countryCode?: string;

  @IsNotEmpty()
  @IsBoolean()
  @Field()
  isAgreedToTerms?: boolean;

  @IsBoolean()
  @Field({ nullable: true })
  subscribedToEnochMails?: boolean;

  isEmailVerified?: boolean;
}
