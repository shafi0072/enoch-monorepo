import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Post } from './post.schema';
import { ResourceType } from '../ENUMS/enums';
import { User } from './user.schema';

export type PostResourceDocument = PostResource & Document;

@Schema({ timestamps: true })
export class PostResource {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post',
  })
  post: Post;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: User;

  @Prop({ enum: ResourceType })
  type: ResourceType;

  @Prop()
  url?: string;

  @Prop()
  fieldname?: string;

  @Prop()
  originalname?: string;

  @Prop()
  encoding?: string;

  @Prop()
  mimetype?: string;

  @Prop()
  bucket?: string;

  @Prop()
  key?: string;

  @Prop()
  size?: Number;

  @Prop()
  acl?: string;

  @Prop()
  contentType?: string;

  @Prop()
  contentDisposition?: string;

  @Prop()
  contentEncoding?: string;

  @Prop()
  ContentEncoding?: string;

  @Prop()
  storageClass?: string;

  @Prop()
  serverSideEncryption?: string;

  @Prop()
  metadata?: string;

  @Prop()
  location?: string;
}

export const PostResourceSchema = SchemaFactory.createForClass(PostResource);
