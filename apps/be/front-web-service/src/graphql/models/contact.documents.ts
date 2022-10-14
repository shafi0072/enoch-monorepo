import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { ContactModel } from './contact.model';

@ObjectType()
export class ContactDocument {
  @Field(type => [ContactModel], { nullable: true })
  comments?: ContactModel[];

  @Field({ nullable: true })
  hasMoreComments: boolean;

  @Field({ nullable: true })
  endCursor: string;

  @Field({ nullable: true })
  startCursor: string;

  @Field()
  startId: string;

  @Field()
  endId: string;
}
