import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AddUserJobExperience {
  @Field({})
  jobTitle?: string;

  @Field({})
  employementType?: string;

  @Field({})
  company?: string;

  @Field({})
  location?: string;

  @Field({})
  isCurrentlyWorking?: boolean;

  @Field({})
  startMonth?: string;

  @Field({})
  startYear?: string;

  @Field({})
  endMonth?: string;

  @Field({})
  endYear?: string;

  @Field({})
  industry?: string;

  @Field({})
  description?: string;
}
