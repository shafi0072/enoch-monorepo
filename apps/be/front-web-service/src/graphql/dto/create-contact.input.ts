import { Field, InputType, ID } from '@nestjs/graphql';
import { CategoryContact } from 'src/shared/enums/category-contact';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateContactInput {
    @Field()
    name?: string;
    
    @Field()
    @IsEmail()
    email?: string;

    @Field({ nullable: true })
    know_about_us?: string;

    @Field({ nullable: true })
    type?: string;

    @Field()
    country?: string;

    @Field()
    text?: string;

    @Field()
    isAgreedTermsAndConditions?: Boolean;
    
    @Field((type) => CategoryContact)
    category?: CategoryContact;
}
