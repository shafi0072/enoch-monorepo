import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Collection } from './collection.shema';
export type NftDocument = Nft & Document;

@Schema({ timestamps: true })
export class Nft {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  description?: string;

  @Prop()
  supply?: string;

  @Prop([{type: mongoose.Schema.Types.String}])
  externalLinks?: string[];

  @Prop([{type: mongoose.Schema.Types.String}])
  tags?: string[];

  @Prop({
      type:{
        nftType: mongoose.Schema.Types.String,
        sex: mongoose.Schema.Types.String,
        race: mongoose.Schema.Types.String
      }
  })
  properties: Object;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
  })
  collectionId: string;
}

export const NftSchema = SchemaFactory.createForClass(Nft);
