import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCollectionDtoGql {
  @Field()
  name: string;

  @Field()
  image: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  symbol: string;

  @Field()
  supply: string;

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  subcategoryId?: string;

  @Field()
  isCategory: boolean;

}
