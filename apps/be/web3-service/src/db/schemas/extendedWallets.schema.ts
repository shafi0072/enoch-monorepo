import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExtendedWalletDocument = ExtendedWallet & Document;

@Schema()
export class ExtendedWallet {
  @Prop()
  xpub: string;

  @Prop()
  mnemonic: string;

  @Prop()
  chain: string;

  @Prop()
  extendedWalletIndex: string;

  @Prop()
  type: string;
}

export const ExtendedWalletSchema =
  SchemaFactory.createForClass(ExtendedWallet);
