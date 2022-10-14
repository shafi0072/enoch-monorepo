import { User, UserSchema } from './users.shema';
import { ExtendedWallet, ExtendedWalletSchema } from './extendedWallets.schema';
import { VirtualWallet, VirtualWalletSchema } from './virtualWallets.schema';
import { DepositWallet, DepositWalletSchema } from './depositWallets.schema';
import {
  KmsPendingTransaction,
  KmsPendingTransactionSchema,
} from './kmsPendingTransaction.schema';
import { Subscription, SubscriptionSchema } from './subscriptions.schema';
import { GasPumpWallet, GasPumpWalletSchema } from './gasPumpWallets.schema';

export const schemas = [
  { name: User.name, schema: UserSchema },
  { name: ExtendedWallet.name, schema: ExtendedWalletSchema },
  { name: VirtualWallet.name, schema: VirtualWalletSchema },
  { name: DepositWallet.name, schema: DepositWalletSchema },
  { name: KmsPendingTransaction.name, schema: KmsPendingTransactionSchema },
  { name: Subscription.name, schema: SubscriptionSchema },
  { name: GasPumpWallet.name, schema: GasPumpWalletSchema },
];
