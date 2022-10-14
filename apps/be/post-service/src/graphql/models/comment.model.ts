import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { ResourcesMetaData } from '../dto/media-metadata';
import { ResourcesMetaDataMOdel } from './resourse.metadata.model';
import { User } from './user.model';

@ObjectType()
export class CommentModel {
  @Field((type) => ID)
  _id: string;

  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  likeCount?: number;

  @Field({ nullable: true })
  dislikeCount?: number;

  @Field({ nullable: true })
  shareCount?: number;

  @Field({ nullable: true })
  commentCounts?: number;

  @Field({ nullable: true })
  viewsCount?: number;

  @Field({ nullable: true })
  sendCount?: number;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => User, { nullable: true })
  userData?: User;

  @Field(() => ID)
  post?: string;

  @Field((type) => ID, { nullable: true })
  parentComment?: string;

  @Field({ nullable: true })
  mediaMetadData: ResourcesMetaDataMOdel;

  @Field({ nullable: true })
  repliesCount?: number;

  @Field()
  createdAt: string;

  @Field({ nullable: true })
  isLiked?: boolean;
}
