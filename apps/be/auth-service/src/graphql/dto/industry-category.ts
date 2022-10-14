import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Industry {
  @Field()
  _id: string;

  @Field()
  industryCategory: string;

  @Field({
    nullable: true,
    defaultValue: false,
  })
  isVerified?: boolean;

  @Field({ nullable: true })
  isSelected?: boolean;
}
