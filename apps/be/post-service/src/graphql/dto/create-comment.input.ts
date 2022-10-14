import { Field, InputType, ID } from '@nestjs/graphql';
import { User } from '../models/user.model';
import { ResourcesMetaData } from './media-metadata';

@InputType()
export class CreateCommentInput {
  @Field()
  text?: string;

  @Field({ nullable: true })
  resourcesMetadData?: ResourcesMetaData;

  @Field(() => ID, { nullable: true })
  parentId?: string;

  @Field(() =>ID,{nullable :true})
  subParentID?:string

  @Field(() =>[String],{nullable:true})
  mentionedUsers?:string[]
}
