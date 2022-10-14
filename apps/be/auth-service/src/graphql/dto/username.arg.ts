import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

@ArgsType()
export class UsernameArg {
  @Field()
  @IsNotEmpty()
  username: string;
}
