import {
  MongooseModuleOptions,
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsChannelDocument = NewsChannel & Document;

@Schema()
export class NewsChannel {
  @Prop()
  _id: string;

  @Prop()
  channelId: string;

  @Prop()
  channelName: string;

  @Prop()
  channelDescription: string;
}

export const NewsChannelSchema = SchemaFactory.createForClass(NewsChannel);
