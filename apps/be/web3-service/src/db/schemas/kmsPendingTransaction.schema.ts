import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type KmsPendingTransactionDocument = KmsPendingTransaction & Document;

@Schema()
export class KmsPendingTransaction {
  @Prop()
  chain: string;

  @Prop()
  type: string;

  @Prop()
  signatureId: string;

  @Prop()
  status: string;

  @Prop()
  txHash?: string;

  @Prop()
  contractAddresses?: Array<1>;

  @Prop()
  error?: string;
}

export const KmsPendingTransactionSchema = SchemaFactory.createForClass(
  KmsPendingTransaction,
);
