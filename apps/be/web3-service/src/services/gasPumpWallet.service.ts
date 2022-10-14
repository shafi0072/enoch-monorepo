import { Injectable, RequestMapping } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
const axios = require('axios').default;
import {
  Currency,
  generatePrivateKeyFromMnemonic,
  generateAddressFromXPub,
} from '@tatumio/tatum';
import { TatumEndPoints } from 'src/constants/TatumEndpoints';
import TatumService from './tatum.service';
import ExtendedWalletService from './extendedWallet.service';
import DepositWalletService from './depositWallet.service';
import VirtualWalletService from './virtualWallet.service';
import {
  KmsPendingTransaction,
  KmsPendingTransactionDocument,
} from 'src/db/schemas/kmsPendingTransaction.schema';
@Injectable()
export default class GasPumpWalletService {
  constructor(
    @InjectModel(KmsPendingTransaction.name)
    private readonly kmsPendingTransactionModel: Model<KmsPendingTransactionDocument>,
    private readonly configService: ConfigService,
    private readonly tatumService: TatumService,
    private readonly extendedWalletService: ExtendedWalletService,
    private readonly depositWalletService: DepositWalletService,
    private readonly virtualWalletService: VirtualWalletService,
  ) {}

  createGasPumpWalletBatch = async (req: any) => {
    try {
      const chain = req.chain;

      const currency = await this.tatumService.getCurrency(chain);
      if (!currency) {
        return { success: false, error: `${chain} blockchain not supported` };
      }

      const adminEntry = await this.virtualWalletService.getVirtualWallets(
        { type: 'admin', currency: currency },
        1,
        0,
      );

      const adminVirtualId = adminEntry[0].id;

      const adminDepositEntry =
        await this.depositWalletService.getDepositWallets(
          { id: adminVirtualId },
          1,
          0,
        );
      const adminAddress = await adminDepositEntry[0].address;

      const data = Object.assign(
        {
          signatureId: this.configService.get(
            `TATUM_ADMIN_SIGNATUREID_${currency}`,
          ),
          index: 1,
          owner: adminAddress,
        },
        req,
      );

      const url =
        this.configService.get('TATUM_BASE_URL') +
        TatumEndPoints.createGasPumpWalletBatch;

      return this.tatumService
        .makePostRequest('post', url, data, {
          'x-api-key': this.configService.get('TATUM_API_KEY'),
        })
        .then(async (result: any) => {
          const type = this.tatumService.getPendingTxType(2);

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

          // const pendingTxData={
          //   chain:currency,
          //   type:type,
          //   signatureId:result.signatureId,
          //   status:this.tatumService.PendingTransactionStatusTypes.PENDING
          // }

          //    const newPendingTransaction = new this.kmsPendingTransactionModel(pendingTxData);
          //  await newPendingTransaction.save();
          return { success: true, data: result };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  };

  createGasPumpWalletBatchByPrivateKey = async (req: any) => {
    try {
      const chain = req.chain;
      const batchCount = req.batchCount;
      const owner = req.owner;
      const isTestnet = true;

      const currency = await this.tatumService.getCurrency(chain);
      if (!currency) {
        return { success: false, error: `${chain} blockchain not supported` };
      }

      //  get private key of admin account
      const adminEntry = await this.extendedWalletService.getExtendedWallets(
        { type: 'admin', chain: chain },
        1,
        0,
      );

      const adminMnemonic = adminEntry[0].mnemonic;

      const adminPrivateKey = await generatePrivateKeyFromMnemonic(
        currency,
        isTestnet,
        adminMnemonic,
        1,
      );
      const adminAddress = await generateAddressFromXPub(
        currency,
        isTestnet,
        adminEntry[0].xpub,
        1,
      );

      const url =
        this.configService.get('TATUM_BASE_URL') +
        TatumEndPoints.createGasPumpWalletBatchPrivateKey;

      const data = {
        chain: currency,
        fromPrivateKey: adminPrivateKey,
        batchCount: req.batchCount,
        owner: adminAddress,
      };

      return this.tatumService
        .makePostRequest('post', url, data, {
          'x-api-key': this.configService.get('TATUM_API_KEY'),
        })
        .then(async (result: any) => {
          return { success: true, data: result };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  };

  getGasPumpWalletsFromTransactionHash = async (req: any) => {
    try {
      console.log(
        '**@ getGasPumpWalletsFromTransactionHash called with req , ',
        req,
      );
      const chain = req.chain;
      const hash = req.txHash;

      const currency = await this.tatumService.getCurrency(chain);
      if (!currency) {
        return { success: false, error: `${chain} blockchain not supported` };
      }

      const url =
        this.configService.get('TATUM_BASE_URL') +
        TatumEndPoints.getGasPumpWalletsFromTransactionHash;
      console.log('**@ url is , ', url);

      const finalUrl = url + `${chain}/${hash}`;
      console.log('**@ finalUrl is , ', finalUrl);

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
          return { success: true, wallets: result };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  };
}
