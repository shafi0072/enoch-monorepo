import { Field, Int, ObjectType, ID } from '@nestjs/graphql';
import { PollDuration } from 'src/shared/enums/poll-enums';
import { PollProps } from './poll.model';
import { PostResource } from './postResources.model';
import { User } from './user.model';

@ObjectType()
export class Post {
  @Field((type) => ID)
  _id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  caption?: string;

  @Field({ nullable: true, defaultValue: 0 })
  likeCount?: number;

  @Field({ nullable: true, defaultValue: 0 })
  dislikeCount?: number;

  @Field({ nullable: true, defaultValue: 0 })
  shareCount?: number;

  @Field({ nullable: true, defaultValue: 0 })
  commentCounts?: number;

  @Field({ nullable: true, defaultValue: 0 })
  viewsCount?: number;

  @Field({ nullable: true, defaultValue: 0 })
  sendCount?: number;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [PostResource], { nullable: true, defaultValue: [] })
  mediaResources?: PostResource[];

  @Field({ nullable: true })
  pollProps?: PollProps;

  @Field({})
  type?: string;

  @Field({ nullable: true })
  optionA?: string;

  @Field({ nullable: true })
  optionB?: string;

  @Field({ nullable: true })
  optionC?: string;

  @Field({ nullable: true })
  optionD?: string;

  @Field(() => Int, { nullable: true })
  optionACount?: number;

  @Field(() => Int, { nullable: true })
  optionBCount?: number;

  @Field(() => Int, { nullable: true })
  optionCCount?: number;

  @Field(() => Int, { nullable: true })
  optionDCount?: number;

  @Field(() => Int, { nullable: true })
  optionAPercent?: number;

  @Field(() => Int, { nullable: true })
  optionBPercent?: string;

  @Field(() => Int, { nullable: true })
  optionCPercent?: string;

  @Field(() => Int, { nullable: true })
  optionDPercent?: string;

  @Field({ nullable: true })
  duration?: PollDuration;

  @Field({ name: 'isExpired', nullable: true })
  isExpired?: boolean;

  @Field()
  createdAt?: string;
}
