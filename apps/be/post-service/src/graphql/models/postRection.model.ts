import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

@ObjectType()
export class PostRections {
  @Field(() => String, { nullable: true })
  _id?: string;

  @Field(() => String)
  post?: string;

  @Field(() => String, { nullable: true })
  user?: User;
}
