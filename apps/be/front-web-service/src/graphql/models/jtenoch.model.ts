import { Field, Int, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class JtenochModel {
   @Field((type) => ID)
   _id: string;
  
   @Field({ nullable: true })
   email: string;
  
   @Field({ nullable: true })
   is_sent: string;

}
