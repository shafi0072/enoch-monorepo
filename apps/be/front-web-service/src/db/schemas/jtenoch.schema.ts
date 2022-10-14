import {
  MongooseModuleOptions,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type JtenochDocument = Jtenoch & Document;

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Jtenoch {
  @Prop()
  email: string;

  @Prop({ default: 0 })
  is_sent?: number;
}

export const JtenochSchema = SchemaFactory.createForClass(Jtenoch);
JtenochSchema.index({ post: 1, createdAt: 1 });
JtenochSchema.index({ post: 1 });