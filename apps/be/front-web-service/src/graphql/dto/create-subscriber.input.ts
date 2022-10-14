import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
@InputType()
export class CreateSubscriberInput {
    @Field()
    @IsEmail()
    email?: string;
}

