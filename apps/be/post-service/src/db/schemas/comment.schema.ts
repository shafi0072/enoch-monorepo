import {
  MongooseModuleOptions,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { Post } from './post.schema';

export type CommentDocument = Comment & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Comment {
  @Prop()
  text: string;

  @Prop({ default: 0 })
  likeCount?: number;

  @Prop({ default: 0 })
  dislikeCount?: number;

  @Prop({ default: 0 })
  viewsCount?: number;

  @Prop({ default: 0 })
  sendCount?: number;

  @Prop({ default: 0 })
  repliesCount?: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: User | string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Post.name,
  })
  post: Post | string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Comment.name,
  })
  parentId?: Comment | string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Comment.name,
  })
  subParentId?: Comment | string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
CommentSchema.index({ post: 1, createdAt: 1 });
CommentSchema.index({ post: 1 });

CommentSchema.virtual('replies', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentId',
});
