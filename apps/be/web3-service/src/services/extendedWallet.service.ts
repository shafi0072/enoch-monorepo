import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Currency, generateWallet } from '@tatumio/tatum';
import {
  ExtendedWallet,
  ExtendedWalletDocument,
} from 'src/db/schemas/extendedWallets.schema';
import DBService from './db.service';
import TatumService from './tatum.service';
import { EvmCompatibleCurrencies } from 'src/constants/SupportedCurrencies';
import * as helpers from '../utils/helpers';

@Injectable()
export default class ExtendedWalletService extends DBService {
  constructor(
    @InjectModel(ExtendedWallet.name)
    private readonly extendedWalletModel: Model<ExtendedWalletDocument>,
    private readonly tatumService: TatumService,
  ) {
    super(extendedWalletModel);
  }

  async generateExtendedWallets(currency: Currency, isTestnet: boolean) {
    return new Promise(async (resolve, reject) => {
      const existingWallets = await this.extendedWalletModel.find({
        type: 'admin',
        chain: currency,
      });

      //  generate an EVM Compatible wallet
      if (EvmCompatibleCurrencies.includes(currency)) {
        const wallet = await generateWallet(
          EvmCompatibleCurrencies[0],
          isTestnet,
        );
        const walletData = [];

        const type = existingWallets.length > 0 ? 'user' : 'admin';
        // store it in db
        //  for all evm compatible blockchains , store the same extended wallet
        for (let i = 0; i < EvmCompatibleCurrencies.length; i++) {
          let newExtendedWallet = Object.assign(
            { chain: EvmCompatibleCurrencies[i], type: type },
            wallet,
          );
          const newWallet = new this.extendedWalletModel(newExtendedWallet);
          walletData.push(newWallet);
        }

        await this.extendedWalletModel.bulkSave(walletData);
        return resolve(wallet);
      } else {
        return reject('Blockchain not supported');
      }
    });
  }

  async generateExtendedPublicKey(walletRequest: any) {
    try {
      const chain = walletRequest.chain;
      const isTestnet = walletRequest.isTestnet;
      //  generate single wallet for eth
      const currency = await this.tatumService.getCurrency(chain);
      if (!currency) {
        return { success: false, error: `${chain} blockchain not supported` };
      }

      return await this.generateExtendedWallets(currency, isTestnet)
        .then((wallet) => {
          return {
            success: true,
            message: 'Extended wallets created successfully',
          };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  }

  hello() {
    return 'hello';
  }

  async getExtendedWallets(query: any, limit: number, offset: number) {
    try {
      const result = await this.extendedWalletModel
        .find(query)
        .limit(limit)
        .skip(offset);
      return result;
    } catch (err) {
      return err;
    }
  }

  async getExtendedWalletCount(query: any) {
    try {
      const result = await this.extendedWalletModel.countDocuments(query);
      return result;
    } catch (err) {
      return err;
    }
  }
}
