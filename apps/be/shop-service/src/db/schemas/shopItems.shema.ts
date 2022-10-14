import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Shop } from './shop.shema';

export type ShopItemDocument = ShopItem & Document;

@Schema()
export class ShopItem {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Banner._id',
  })
  bannerId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Nft._id',
  })
  nftId: string;

  @Prop({ default: false })
  isPinned: boolean;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Shop',
  })
  shopId: Shop;
}

export const ShopItemSchema = SchemaFactory.createForClass(ShopItem);
