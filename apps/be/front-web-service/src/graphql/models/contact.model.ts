import { Field, Int, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class ContactModel {
   @Field((type) => ID)
   _id: string;
  
   @Field({ nullable: true })
   category?: string;

   @Field({ nullable: true })
   name: string;

   @Field({ nullable: true })
   email: string;

   @Field({ nullable: true })
   type: string;

   @Field({ nullable: true })
   connect_type: string;

   @Field({ nullable: true })
   country: string;

   @Field({ nullable: true })
   text: string;

   @Field({ nullable: true })
   isAgreedTermsAndConditions: Boolean;

}
