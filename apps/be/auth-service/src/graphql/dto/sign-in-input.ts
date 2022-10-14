import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@ArgsType()
export class SingnInInput {
  @Field({ nullable: true })
  @IsNotEmpty()
  email?: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  passkey: string;
}
