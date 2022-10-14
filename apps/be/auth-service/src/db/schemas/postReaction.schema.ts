import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Post } from './post.schema';
import { ReactionType } from '../ENUMS/enums';
import { User } from './user.schema';

export type PostReactionDocument = PostReaction & Document;

@Schema({ timestamps: true })
export class PostReaction {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Post.name,
  })
  post: Post | string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: User;

  @Prop({ enum: ReactionType })
  type: ReactionType;
}

export const PostReactionSchema = SchemaFactory.createForClass(PostReaction);
PostReactionSchema.index({ post: 1, user: 1 });
