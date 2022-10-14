import { Field, InputType } from '@nestjs/graphql';
import { PostType, PostVisibility } from 'src/db/ENUMS/enums';
import { PollDuration } from 'src/shared/enums/poll-enums';
import { ResourcesMetaData } from './media-metadata';

@InputType()
export class CreatePostInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  caption?: string;

  @Field({ nullable: true })
  postingAs?: string;

  @Field((type) => PostType)
  type?: PostType;

  @Field({ nullable: true })
  resourceId?: string;

  @Field((type) => PostVisibility, { nullable: true })
  whoCanSee?: PostVisibility;

  @Field({ nullable: true })
  optionA?: string;

  @Field({ nullable: true })
  optionB?: string;

  @Field({ nullable: true })
  optionC?: string;

  @Field({ nullable: true })
  optionD?: string;

  @Field(() => PollDuration, { nullable: true })
  duration?: PollDuration;

  @Field((type) => [ResourcesMetaData], { nullable: true })
  mediaResources?: Array<ResourcesMetaData>;
}
