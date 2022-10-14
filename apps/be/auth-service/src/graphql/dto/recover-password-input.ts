import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ERROR_MESSAGES } from '../../constant.json';
@InputType()
export class RecoverPasswordInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
