import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VirtualWalletDocument = VirtualWallet & Document;

@Schema()
export class VirtualWallet {
  @Prop()
  userId: string;

  @Prop()
  extendedWalletIndex: string;

  @Prop()
  type: string;

  @Prop()
  currency: string;

  @Prop()
  active: boolean;

  @Prop()
  frozen: boolean;

  @Prop()
  xpub: string;

  @Prop()
  customerId: string;

  @Prop()
  accountingCurrency: string;

  @Prop()
  id: string;
}

export const VirtualWalletSchema = SchemaFactory.createForClass(VirtualWallet);
