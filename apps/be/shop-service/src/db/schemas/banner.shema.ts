import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BannerDocument = Banner & Document;

@Schema()
export class Banner {
  @Prop({ required: true })
  name: string;
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
