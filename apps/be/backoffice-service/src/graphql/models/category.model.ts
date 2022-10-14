import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Category {

  @Field((type) => ID)
  _id: string;

  @Field()
  name: string;

  @Field()
  image: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  hasSubcategory: boolean;

  @Field((type) => ID)
  createdBy: string;

  @Field()
  createdAt: Date;
}