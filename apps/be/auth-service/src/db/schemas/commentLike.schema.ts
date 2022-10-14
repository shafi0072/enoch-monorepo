import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Post } from './post.schema';
import { ReactionType } from '../ENUMS/enums';
import { User } from './user.schema';
import { Comment } from './comment.schema';

export type CommentLikeDocument = CommentLike & Document;

@Schema({ timestamps: true })
export class CommentLike {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Post.name,
  })
  postId?: Post | string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user?: User | string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Comment.name,
  })
  commentId: Comment | string;
}

export const CommentLikeSchema = SchemaFactory.createForClass(CommentLike);

CommentLikeSchema.index({ postId: 1, commentId: 1, user: 1 }, { unique: true });
