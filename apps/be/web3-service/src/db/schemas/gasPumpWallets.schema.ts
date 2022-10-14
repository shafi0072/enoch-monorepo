import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GasPumpWalletDocument = GasPumpWallet & Document;

@Schema()
export class GasPumpWallet {
  @Prop()
  chain: string;

  @Prop()
  address: string;

  @Prop()
  isAssigned: boolean;

  @Prop()
  virtualId: string;
}

export const GasPumpWalletSchema = SchemaFactory.createForClass(GasPumpWallet);
