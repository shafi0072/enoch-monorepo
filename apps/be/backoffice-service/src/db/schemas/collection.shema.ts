import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type CollectionDocument = Collection & Document;

@Schema({ timestamps: true })
export class Collection {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  description?: string;

  @Prop()
  symbol: string;

  @Prop()
  supply: string;

  @Prop()
  isCategory: boolean;

}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
