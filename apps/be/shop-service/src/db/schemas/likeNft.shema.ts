import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Nft } from './nft.shema';
import { User } from './users.shema';
export type LikeNftDocument = LikeNft & Document;

@Schema()
export class LikeNft {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Nft._id',
  })
  @Prop({ required: true })
  nftId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User._id',
  })
  userId: string;

  @Prop({ default: false })
  isLiked: boolean;
}

export const LikeNftSchema = SchemaFactory.createForClass(LikeNft);
