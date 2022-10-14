import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ShopDocument = Shop & Document;
@Schema()
export class Shop {
  @Prop()
  description?: string;

  @Prop()
  userId: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);
