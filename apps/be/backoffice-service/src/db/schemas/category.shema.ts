import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './users.shema';
import { Collection } from './collection.shema';
export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  description?: string;

  @Prop({ default: true })
  hasSubcategory: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  createdBy: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
  })
  collectionId?: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
