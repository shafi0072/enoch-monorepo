import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { Media } from './media.model';

@ObjectType()
export class MediaListDocument {
  @Field((type) => [Media], { nullable: true })
  media?: Media[];

  @Field({ nullable: true })
  hasMoreMedia: boolean;

  @Field({ nullable: true })
  endCursor: string;

  @Field({ nullable: true })
  startCursor: string;

  @Field()
  startId: string;

  @Field()
  endId: string;
}
