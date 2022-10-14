import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SMSDetailsDocument = SMSDetails & Document;

@Schema() 
export class SMSDetails {

  @Prop({ required: true })
  mobileNumber: string;

  @Prop()
  otp: string;

  @Prop({ default: false })
  otpVerified: boolean;

  @Prop()
  expiryTime: Date;

  @Prop([String])
  messageSentResponse: string[];

  @Prop({ default: Date.now() })
  createdAt: Date;
}

export const SMSDetailsSchema = SchemaFactory.createForClass(SMSDetails);
