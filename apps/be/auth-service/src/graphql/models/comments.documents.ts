import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { CommentModel } from './comment.model';

@ObjectType()
export class CommentDocument {
  @Field((type) => [CommentModel], { nullable: true })
  comments?: CommentModel[];

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
