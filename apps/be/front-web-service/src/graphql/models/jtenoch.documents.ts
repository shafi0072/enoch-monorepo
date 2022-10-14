import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { JtenochModel } from './jtenoch.model';

@ObjectType()
export class JtenochDocument {
  @Field(type => [JtenochModel], { nullable: true })
  Jtenochs?: JtenochModel[];

  @Field({ nullable: true })
  hasMoreComments: boolean;

  @Field({ nullable: true })
  endCursor: string;

  @Field({ nullable: true })
  startCursor: string;

  @Field()
  startId: string;

  @Field()
  endId: string;
}
