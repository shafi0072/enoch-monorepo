import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSubcategoryDtoGql {
  @Field()
  name: string;

  @Field()
  categoryId: string;

  @Field({ nullable: true })
  description?: string;
}
