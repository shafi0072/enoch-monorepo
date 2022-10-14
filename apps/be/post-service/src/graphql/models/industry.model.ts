import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IndustryModel {
  @Field()
  _id: string;

  @Field()
  industryCategory: string;
}
