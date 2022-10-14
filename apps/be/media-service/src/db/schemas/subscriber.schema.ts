import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/db/schemas/user.schema';
import { SubscriberStatus } from '../ENUMS/enums';
import { Document } from 'mongoose';

export type SubscriberDocument = Subscriber & Document;

@Schema()
export class Subscriber {
  @Prop()
  _id: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: User;

  @Prop({ require: true })
  subscribeDate: Date;

  @Prop({ require: true })
  totalViews: number;

  @Prop({ enum: SubscriberStatus })
  status: SubscriberStatus;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
