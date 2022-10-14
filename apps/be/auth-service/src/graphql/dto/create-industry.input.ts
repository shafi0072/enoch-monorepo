import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateIndustryInput {
  @Field()
  industryCategory: string;

  @Field({
    nullable: true,
    defaultValue: false,
  })
  isVerified?: boolean;
}
