import {
    MongooseModuleOptions,
    Prop,
    Schema,
    SchemaFactory,
  } from '@nestjs/mongoose';
  import { Document } from 'mongoose';
  import * as mongoose from 'mongoose';
  
  export type SubscriberDocument = Subscriber & Document;
  
  @Schema({
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  })
  export class Subscriber {
    @Prop()
    email: string;

    @Prop({ default: 0 })
    is_sent?: number;
  }
  
  export const SubscriberSchema = SchemaFactory.createForClass(Subscriber);
  SubscriberSchema.index({ post: 1, createdAt: 1 });
  SubscriberSchema.index({ post: 1 });