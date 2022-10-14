import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './users.shema';
import { Category } from './category.shema';
import { Collection } from './collection.shema';
export type SubcategoryDocument = Subcategory & Document;

@Schema({ timestamps: true })
export class Subcategory {
  @Prop()
  name: string;

  @Prop()
  description?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  categoryId: string;

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

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
