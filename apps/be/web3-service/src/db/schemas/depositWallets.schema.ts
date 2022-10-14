import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DepositWalletDocument = DepositWallet & Document;

@Schema()
export class DepositWallet {
  @Prop()
  currency: string;

  @Prop()
  derivationKey: string;

  @Prop()
  xpub: string;

  @Prop()
  address: string;

  @Prop()
  id: string;

  @Prop()
  customerId: string;

  @Prop()
  userId: string;
}

export const DepositWalletSchema = SchemaFactory.createForClass(DepositWallet);
