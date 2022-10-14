import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MentionQuery {
  @Field({ nullable: true })
  commentId?: string;

  @Field({ nullable: true })
  postId?: string;

  @Field({ nullable: true })
  query: string;

  @Field({ nullable: true })
  maxResults?: number;
}
