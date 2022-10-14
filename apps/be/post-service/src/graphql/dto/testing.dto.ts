import { ArgsType, Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsPhoneNumber,ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsNotBlank } from 'src/decorator/is-not-balnk.decorator';
import { TestingDto2 } from './testing.dto2.decorator';


@InputType()
export class TestingDto {
  @Field()
  @IsNotEmpty()
  countryCode: string;

  @Field()
  @IsNotEmpty()
  @IsNotBlank("phoneNumber",{
    message:"please enter a valid input"
  })
   phoneNumber: string;

   @Field(type =>TestingDto2)
   @ValidateNested({each:true})
   @Type(() =>TestingDto2)
   testing:TestingDto2
}
