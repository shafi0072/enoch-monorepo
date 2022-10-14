import { Field, ObjectType } from '@nestjs/graphql';
import { Industry } from './industry-category';

@ObjectType()
export class SuggestedIndustries {
  @Field((type) => [Industry], { nullable: true })
  industries: Industry[];

  @Field(() => [String], { nullable: true })
  selectedIndustries?: string[];
}
