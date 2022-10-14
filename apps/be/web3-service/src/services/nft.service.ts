import { Injectable, RequestMapping } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import {
  Currency,
  generateDepositAddress,
  Address,
  deployNFT,
} from '@tatumio/tatum';
import {
  KmsPendingTransaction,
  KmsPendingTransactionDocument,
} from 'src/db/schemas/kmsPendingTransaction.schema';
import DBService from './db.service';
import { TatumEndPoints } from 'src/constants/TatumEndpoints';
import TatumService from './tatum.service';

@Injectable()
export default class NftService extends DBService {
  constructor(
    @InjectModel(KmsPendingTransaction.name)
    private readonly kmsPendingTransactionModel: Model<KmsPendingTransactionDocument>,
    private readonly configService: ConfigService,
    private readonly tatumService: TatumService,
  ) {
    super(kmsPendingTransactionModel);
  }

  async getNftTransactionHistory(req: any) {
    try {
      const chain = req.chain;
      const currency = await this.tatumService.getCurrency(chain);
      if (!currency) {
        return { success: false, error: `${chain} blockchain not supported` };
      }

      const url =
        this.configService.get('TATUM_BASE_URL') +
        TatumEndPoints.getNftTransactionHistoryByAddressAndContractAddress;
      const finalUrl = url + `${chain}/${req.address}/${req.tokenAddress}`;

      return this.tatumService
        .makeGetRequest(finalUrl, req, {})
        .then((result) => {
          return { success: true, transactionHistory: result };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getNftBalance(req: any) {
    try {
      const chain = req.chain;
      const currency = await this.tatumService.getCurrency(chain);
      if (!currency) {
        return { success: false, error: `${chain} blockchain not supported` };
      }

      let url = '';
      let finalUrl = '';
      if (!req.contractAddress) {
        url =
          this.configService.get('TATUM_BASE_URL') +
          TatumEndPoints.getNftBalanceByAddress;
        finalUrl = url + `${chain}/${req.address}`;
      } else {
        url =
          this.configService.get('TATUM_BASE_URL') +
          TatumEndPoints.getNftBalanceByAddressAndContract;
        finalUrl = url + `${chain}/${req.contractAddress}/${req.address}`;
      }

      return this.tatumService
        .makeGetRequest(
          finalUrl,
          {},
          {
            'x-testnet-type': 'ethereum-ropsten',
            'x-api-key': `${this.configService.get('TATUM_API_KEY')}`,
          },
        )
        .then((result) => {
          return { success: true, balance: result };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async deployNftCollection(req: any) {
    try {
      const chain = req.chain;
      const currency = await this.tatumService.getCurrency(chain);
      if (!currency) {
        return { success: false, error: `${chain} blockchain not supported` };
      }

      let deployNftData = Object.assign(
        {
          signatureId: this.configService.get(
            `TATUM_ADMIN_SIGNATUREID_${currency}`,
          ),
          index: 1,
        },
        req,
      );

      const url =
        this.configService.get('TATUM_BASE_URL') +
        TatumEndPoints.deployNftCollectionKms;

      return this.tatumService
        .makePostRequest('post', url, deployNftData, {
          'x-api-key': this.configService.get('TATUM_API_KEY'),
          'x-testnet-type': 'ethereum-sepolia',
        })
        .then(async (result: any) => {
          const type = this.tatumService.getPendingTxType(1);

          const saveData = {
            chain: currency,
            type: type,
            signatureId: result.signatureId,
            status: this.tatumService.PendingTransactionStatusTypes.PENDING,
          };

          console.log('**@ saveData is , ', saveData);

          const pendingTransaction = new this.kmsPendingTransactionModel(
            saveData,
          );
          await pendingTransaction.save();

          return { success: true, data: result };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getSignatureIdStatus(req: any) {
    try {
      let id = req.signatureId;
      const url =
        this.configService.get('TATUM_BASE_URL') +
        TatumEndPoints.getSignatureIdStatus +
        id;

      return this.tatumService
        .makeGetRequest(
          url,
          {},
          {
            'x-api-key': this.configService.get('TATUM_API_KEY'),
          },
        )
        .then(async (result: any) => {
          return { success: true, data: result };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getNftTransactionDetailsByHash(req: any) {
    try {
      const chain = req.chain;
      const hash = req.txHash;
      const currency = await this.tatumService.getCurrency(chain);
      if (!currency) {
        return { success: false, error: `${chain} blockchain not supported` };
      }

      const url =
        this.configService.get('TATUM_BASE_URL') +
        TatumEndPoints.getNftTransactionDetailsByHash;

      const finalUrl = url + `${chain}/${hash}`;

      return this.tatumService
        .makeGetRequest(
          finalUrl,
          {},
          {
            'x-testnet-type': 'ethereum-ropsten',
            'x-api-key': `${this.configService.get('TATUM_API_KEY')}`,
          },
        )
        .then((result) => {
          return { success: true, data: result };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  }
}
