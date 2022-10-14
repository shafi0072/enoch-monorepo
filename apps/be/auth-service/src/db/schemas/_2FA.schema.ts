import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

export type _2FADocument = _2FA & Document;

@Schema()
export class _2FA {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User;

  @Prop({ required: true })
  mobilenumber: string;

  @Prop()
  otp: string;

  @Prop()
  _2faMethodType: string;

  @Prop({ default: false })
  otpverified: boolean;

  @Prop()
  expiration_time: Date;

  @Prop()
  userLocation: string;

  @Prop()
  userDeviceName: string;

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const _2FASchema = SchemaFactory.createForClass(_2FA);
