import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Post } from './post.schema';
import { ReactionType } from '../ENUMS/enums';
import { User } from './user.schema';

export type PollPostDocument = PollPost & Document;

@Schema({ timestamps: true })
export class PollPost {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post',
    unique: true,
  })
  post: Post;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  user: User;

  @Prop({
    require: true,
  })
  optionA: string;

  @Prop({
    require: true,
  })
  optionB: string;

  @Prop()
  optionC: string;

  @Prop()
  optionD: string;

  @Prop({ type: mongoose.Schema.Types.Number, default: 0 })
  optionACount: number;

  @Prop({ type: mongoose.Schema.Types.Number, default: 0 })
  optionBCount: number;

  @Prop({ type: mongoose.Schema.Types.Number, default: 0 })
  optionCCount: number;

  @Prop({ type: mongoose.Schema.Types.Number, default: 0 })
  optionDCount: number;

  @Prop({ type: mongoose.Schema.Types.Number, default: 0 })
  optionAPercent: number;

  @Prop({ type: mongoose.Schema.Types.Number, default: 0 })
  optionBPercent: number;

  @Prop({ type: mongoose.Schema.Types.Number, default: 0 })
  optionCPercent: number;

  @Prop({ type: mongoose.Schema.Types.Number, default: 0 })
  optionDPercent: number;

  @Prop({ default: 0 })
  totalVoteCount: number;

  @Prop({})
  duration: Date;

  @Prop()
  voteDurationTimeLeft: string;
}

export const PollPostSchema = SchemaFactory.createForClass(PollPost);
