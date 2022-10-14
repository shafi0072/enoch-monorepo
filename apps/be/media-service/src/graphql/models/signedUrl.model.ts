import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignedUrl {
  @Field({ nullable: true })
  url: string;
}
