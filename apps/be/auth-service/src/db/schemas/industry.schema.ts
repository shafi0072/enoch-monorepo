import {
  MongooseModuleOptions,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type IndustryDocument = Industry & Document;

@Schema()
export class Industry {
  @Prop()
  _id: string;

  @Prop()
  industryId: string;

  @Prop()
  industryCategory: string;

  @Prop({
    required: false,
    default: false,
  })
  isVerified?: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  })
  createdBy: User;
}

export const IndsutrySchema = SchemaFactory.createForClass(Industry);
