import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CouponDocument = Coupon & Document;

@Schema()
export class Coupon {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  discount: number;

  @Prop()
  amount?: number;

  @Prop()
  expiryDate?: string;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
