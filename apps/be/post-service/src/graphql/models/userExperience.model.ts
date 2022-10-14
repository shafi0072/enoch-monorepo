import { Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class UserExperience {
  @Field(type => ID)
  _id?: string;

  @Field({ nullable: true })
  jobTitle?: string;

  @Field({ nullable: true })
  employementType?: string;

  @Field({ nullable: true })
  company?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  isCurrentlyWorking?: boolean;

  @Field({ nullable: true })
  startMonth?: string;

  @Field({ nullable: true })
  startYear?: string;

  @Field({ nullable: true })
  endMonth?: string;

  @Field({ nullable: true })
  endYear?: string;

  @Field({ nullable: true })
  industry?: string;

  @Field({ nullable: true })
  description?: string;
}
