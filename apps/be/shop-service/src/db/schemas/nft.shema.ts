import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NftDocument = Nft & Document;

@Schema()
export class Nft {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  collectionId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  nftContractAddress: string;

  @Prop({ required: true })
  tokenId?: string;

  @Prop()
  tokenUrl?: string;

  @Prop({ required: true })
  token: string;

  @Prop()
  owner: string;

  @Prop({ required: true })
  walletAddress: string;

  @Prop({ required: true })
  walletType: string;
}
export const NftSchema = SchemaFactory.createForClass(Nft);
