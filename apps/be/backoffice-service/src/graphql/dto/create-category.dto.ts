import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryDtoGql {
  @Field()
  name: string;

  @Field()
  image: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ defaultValue: true })
  hasSubcategory: boolean;
}
