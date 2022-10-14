import {
  MongooseModuleOptions,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';
import { PostType, PostVisibility } from '../ENUMS/enums';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop()
  title?: string;

  @Prop()
  caption?: string;

  @Prop({ default: 0 })
  likeCount?: number;

  @Prop({ default: 0 })
  heartCount?: number;

  @Prop({ default: 0 })
  careCount?: number;

  @Prop({ default: 0 })
  clapCount?: number;

  @Prop({ default: 0 })
  ideaCount?: number;

  @Prop({ default: 0 })
  amazeCount?: number;

  @Prop({ default: 0 })
  dislikeCount?: number;

  @Prop({ default: 0 })
  shareCount?: number;

  @Prop({ default: 0 })
  commentCount?: number;

  @Prop({ default: 0 })
  viewsCount?: number;

  @Prop({ default: 0 })
  sendCount?: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user?: User | string;

  @Prop({
    type: [
      {
        type: String,
        default: [],
      },
    ],
  })
  hashtags?: Array<string>;

  @Prop({ enum: PostType })
  type?: PostType;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
      },
    ],
  })
  taggedUsers?: Array<User>;

  @Prop({ enum: PostVisibility })
  whoCanSee?: PostVisibility;

  @Prop({
    type: [
      {
        type: {
          _id: { type: mongoose.Schema.Types.ObjectId },
          fieldname: String,
          originalname: String,
          encoding: String,
          mimetype: String,
          bucket: String,
          key: String,
          size: Number,
          acl: String,
          contentType: String,
          contentDisposition: String,
          contentEncoding: String,
          storageClass: String,
          serverSideEncryption: String,
          metadata: String,
          location: String,
        },
      },
    ],
  })
  mediaResources?: Array<Object>;

  @Prop()
  optionA?: string;

  @Prop()
  optionB?: string;

  @Prop()
  optionC?: string;

  @Prop()
  optionD?: string;

  @Prop({ type: mongoose.Schema.Types.Number })
  optionACount?: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  optionBCount?: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  optionCCount?: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  optionDCount?: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  optionAPercent?: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  optionBPercent?: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  optionCPercent?: number;

  @Prop({ type: mongoose.Schema.Types.Number })
  optionDPercent?: number;

  @Prop({})
  totalVoteCount?: number;

  @Prop({})
  duration?: Date;

  @Prop()
  voteDurationTimeLeft?: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
