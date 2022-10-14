import UserService from './user.service';
import ExtendedWalletService from './extendedWallet.service';
import VirtualWalletService from './virtualWallet.service';
import DepositWalletService from './depositWallet.service';
import NftService from './nft.service';
import TatumService from './tatum.service';
import GasPumpWalletService from './gasPumpWallet.service';
import WebhookService from './webhook.service';
import HandleWebhookCallbackService from './webhookCallback.service';

export const services = [
  UserService,
  ExtendedWalletService,
  VirtualWalletService,
  DepositWalletService,
  NftService,
  TatumService,
  GasPumpWalletService,
  WebhookService,
  HandleWebhookCallbackService,
];
