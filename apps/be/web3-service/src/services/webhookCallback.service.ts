import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import {
  KmsPendingTransaction,
  KmsPendingTransactionDocument,
} from 'src/db/schemas/kmsPendingTransaction.schema';
import {
  GasPumpWallet,
  GasPumpWalletDocument,
} from 'src/db/schemas/gasPumpWallets.schema';
import TatumService from './tatum.service';
import DBService from './db.service';
import WebhookService from './webhook.service';
import NftService from './nft.service';
import GasPumpWalletService from './gasPumpWallet.service';
import { TatumEndPoints } from 'src/constants/TatumEndpoints';

@Injectable()
export default class HandleWebhookCallbackService extends DBService {
  constructor(
    @InjectModel(KmsPendingTransaction.name)
    private readonly kmsPendingTransactionModel: Model<KmsPendingTransactionDocument>,
    @InjectModel(GasPumpWallet.name)
    private readonly gasPumpWalletModel: Model<GasPumpWalletDocument>,
    private readonly tatumService: TatumService,
    private readonly configService: ConfigService,
    private readonly webhookService: WebhookService,
    private readonly nftService: NftService,
    private readonly gasPumpWalletService: GasPumpWalletService,
  ) {
    super(kmsPendingTransactionModel);
  }

  async handleWebhookCallback(req: any) {
    try {
      const signatureId = req.signatureId;
      const pendingTransaction = await this.getPendingTransactions(
        {
          signatureId: signatureId,
          status: this.tatumService.PendingTransactionStatusTypes.PENDING,
        },
        1,
        0,
      );

      if (pendingTransaction && pendingTransaction.length > 0 && req.error) {
        //  transaction has failed
        const updatedData = {
          status: this.tatumService.PendingTransactionStatusTypes.FAILED,
          error: JSON.parse(req.error).message,
        };

        await this.kmsPendingTransactionModel.findOneAndUpdate(
          { signatureId: signatureId },
          updatedData,
        );
        return {
          success: true,
          message: `Pending transaction with signatureId ${req.signatureId} updated`,
        };
      } else if (pendingTransaction && pendingTransaction.length > 0) {
        const transactionData: any = await this.nftService.getSignatureIdStatus(
          req,
        );

        if (transactionData.data.txId) {
          if (
            pendingTransaction[0].type == this.tatumService.getPendingTxType(1)
          ) {
            //  its nft deployment
            const txDetails: any =
              await this.nftService.getNftTransactionDetailsByHash({
                chain: transactionData.data.chain,
                txHash: transactionData.data.txId,
              });

            if (!txDetails.success) {
              return this.handleWebhookCallback(req);
            }

            const contractAddress = txDetails.data.contractAddress;

            const updatedData = {
              contractAddresses: [contractAddress],
              status: this.tatumService.PendingTransactionStatusTypes.SUCCESS,
              txHash: transactionData.data.txId,
            };

            await this.kmsPendingTransactionModel.findOneAndUpdate(
              { signatureId: signatureId },
              updatedData,
            );
            return {
              success: true,
              message: `Pending transaction with signatureId ${req.signatureId} updated`,
            };
          } else if (
            pendingTransaction[0].type == this.tatumService.getPendingTxType(2)
          ) {
            //  its a gas pump wallet creation tx
            const queryData = {
              chain: transactionData.data.chain,
              txHash: transactionData.data.txId,
            };

            const txDetails: any =
              await this.gasPumpWalletService.getGasPumpWalletsFromTransactionHash(
                queryData,
              );

            if (!txDetails.success) {
              return this.handleWebhookCallback(req);
            }

            const contractAddresses = txDetails.wallets;

            //  add gas pump wallets in db
            let gasPumpWalletsSaveData = [];
            for (let i = 0; i < contractAddresses.length; i++) {
              let newWallet = new this.gasPumpWalletModel({
                chain: transactionData.data.chain,
                isAssigned: false,
                address: contractAddresses[i],
                virtualId: '',
              });

              gasPumpWalletsSaveData.push(newWallet);
            }

            await this.gasPumpWalletModel.bulkSave(gasPumpWalletsSaveData);
            // update pending tx data
            const updatedData = {
              contractAddresses: contractAddresses,
              status: this.tatumService.PendingTransactionStatusTypes.SUCCESS,
              txHash: transactionData.data.txId,
            };
            //  update pending txs
            await this.kmsPendingTransactionModel.findOneAndUpdate(
              { signatureId: signatureId },
              updatedData,
            );

            return {
              success: true,
              message: `Pending transaction with signatureId ${req.signatureId} updated`,
            };
          }
        }

        return { sucess: true, message: 'Success' };
      } else {
        return {
          success: true,
          message: `No Pending tx with signatureId ${req.signatureId}`,
        };
      }
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getPendingTransactions(query: any, limit: number, offset: number) {
    try {
      const result = await this.kmsPendingTransactionModel
        .find(query)
        .limit(limit)
        .skip(offset);
      return result;
    } catch (err) {
      return err;
    }
  }

  async getPendingTransactionsCount(query: any) {
    try {
      const result = await this.kmsPendingTransactionModel.countDocuments(
        query,
      );
      return result;
    } catch (err) {
      return err;
    }
  }
}
