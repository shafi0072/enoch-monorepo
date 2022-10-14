import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AllowedUserDocument = AllowedUser & Document;

@Schema()
export class AllowedUser {
  @Prop({ unique: true })
  email: string;

  @Prop()
  hashedPassKey: string;

  @Prop({ default: false })
  isEmailSent: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const AllowedUserSchema = SchemaFactory.createForClass(AllowedUser);
