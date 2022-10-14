import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Post } from './post.schema';
import { ReactionType } from '../ENUMS/enums';
import { User } from './user.schema';
import { PollPost } from './pollPost.schema';

export type PollVoteDocument = PollVote & Document;

@Schema({ timestamps: true })
export class PollVote {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post',
  })
  post: Post;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  })
  user: User;

  @Prop({ type: String, require: true })
  userSelectedOption: string;

  @Prop()
  voteStatus: boolean;
}

export const PollVoteSchema = SchemaFactory.createForClass(PollVote);
