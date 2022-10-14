import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Subcategory {
  @Field((type) => ID)
  _id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => ID)
  categoryId: string;

  @Field((type) => ID)
  createdBy: string;

  @Field()
  createdAt: Date;
}
