import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/db/schemas/user.schema';
import { Media } from './media.schema';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
  @Prop({ require: true })
  enableRewards: boolean;

  @Prop({ type: [{ type: String, default: [] }] })
  enableBadges?: Array<string>;

  @Prop({ type: [{ type: String, default: [] }] })
  enableEmotes?: Array<string>;

  @Prop({ type: [{ type: String, default: [] }] })
  enableGifts?: Array<string>;

  @Prop({ require: true })
  price: number;

  @Prop({ require: true })
  startDate: Date;

  @Prop({ require: true })
  endDate: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Media.name,
    required: true,
  })
  mediaId: Media;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: User;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
