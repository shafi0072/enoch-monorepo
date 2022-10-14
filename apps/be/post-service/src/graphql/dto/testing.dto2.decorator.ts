import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { IsNotBlank } from 'src/decorator/is-not-balnk.decorator';
import { PhoneNumber } from './phone-number';

@InputType()
export class TestingDto2 {
  @Field()
  @IsNotEmpty()
  @IsNotBlank("name",{
    message:"please enter a valid in put"
  })
   name: string;
}
