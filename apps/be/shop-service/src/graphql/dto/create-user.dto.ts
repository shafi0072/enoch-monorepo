import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDtoGql {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}
