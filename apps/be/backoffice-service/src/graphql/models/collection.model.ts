import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Collection {
  @Field((type) => ID)
  _id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  image: string;

  @Field()
  symbol: string;

  @Field()
  supply: string;

  @Field()
  createdAt: Date;
}
