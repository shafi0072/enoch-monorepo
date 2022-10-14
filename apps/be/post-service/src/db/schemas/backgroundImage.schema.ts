import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BackgroundImageDocument = BackgroundImage & Document;

@Schema()
export class BackgroundImage {
  @Prop()
  backgroundImageURL: string;
}

export const BackgroundSchema = SchemaFactory.createForClass(BackgroundImage);
