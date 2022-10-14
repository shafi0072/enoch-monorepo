import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Banner {
  @Field((type) => ID)
  _id: string;

  @Field()
  name: string;
}
