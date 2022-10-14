import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Post } from './post.schema';
import { ResourceType } from '../ENUMS/enums';

export type CommentResourceDocument = CommentResource & Document;

@Schema({ timestamps: true })
export class CommentResource {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Post.name,
  })
  post: Post;

  @Prop({ enum: ResourceType })
  type: ResourceType;

  @Prop()
  url: string;

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
  size?: number;

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

export const CommentResourceSchema =
  SchemaFactory.createForClass(CommentResource);
