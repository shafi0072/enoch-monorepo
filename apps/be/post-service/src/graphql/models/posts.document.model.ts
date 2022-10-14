import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { Post } from './post.model';

@ObjectType()
export class PostsDocument {
  @Field(type => [Post], { nullable: true })
  posts?: Post[];

  @Field({ nullable: true })
  hasMorePosts: boolean;

  @Field({ nullable: true })
  endCursor: string;

  @Field({ nullable: true })
  startCursor: string;

  @Field()
  startId: string;

  @Field()
  endId: string;
}
