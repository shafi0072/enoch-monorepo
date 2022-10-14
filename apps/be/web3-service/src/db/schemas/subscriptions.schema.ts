import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SubscriptionDocument = Subscription & Document;

@Schema()
export class Subscription {
  @Prop()
  id: string;

  @Prop()
  type: string;

  @Prop({ type: Object })
  attr: Object;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
