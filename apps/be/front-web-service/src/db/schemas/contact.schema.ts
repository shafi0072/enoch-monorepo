import {
    MongooseModuleOptions,
    Prop,
    Schema,
    SchemaFactory,
  } from '@nestjs/mongoose';
  import { Document } from 'mongoose';
  import * as mongoose from 'mongoose';
  import { CategoryContact } from '../ENUMS/enums';

  export type ContactDocument = Contact & Document;
  
  @Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  })
  export class Contact {
    @Prop()
    name: string;
  
    @Prop()
    email: string;
  
    @Prop()
    type: string;
  
    @Prop()
    country: string;
  
    @Prop()
    know_about_us: string;
  
    @Prop({ enum: CategoryContact })
    category?: CategoryContact;
  
    @Prop()
    text: string;
  }
  
  export const ContactSchema = SchemaFactory.createForClass(Contact);
  ContactSchema.index({ post: 1, createdAt: 1 });
  ContactSchema.index({ post: 1 });