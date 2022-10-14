import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
@InputType()
export class CreateJtenochInput {
    @Field()
    @IsEmail()
    email?: string;
}

