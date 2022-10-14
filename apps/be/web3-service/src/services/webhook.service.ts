import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from 'src/db/schemas/subscriptions.schema';
import TatumService from './tatum.service';
import DBService from './db.service';
import { TatumEndPoints } from 'src/constants/TatumEndpoints';

@Injectable()
export default class WebhookService extends DBService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,
    private readonly tatumService: TatumService,
    private readonly configService: ConfigService,
  ) {
    super(subscriptionModel);
  }

  async createSubscription(req: any) {
    try {
      const chain = req.chain;
      const currency = await this.tatumService.getCurrency(chain);
      if (chain && !currency) {
        return { success: false, error: `${chain} blockchain not supported` };
      }
      const data = this.tatumService.getSubscriptionData(req.type, req);
      if (!data) {
        return { success: false, error: `Invalid Subscription type` };
      }

      const url =
        this.configService.get('TATUM_BASE_URL') +
        TatumEndPoints.createSubscription;

      return this.tatumService
        .makePostRequest('post', url, data, {
          'x-testnet-type': 'ethereum-sepolia',
          'x-api-key': `${this.configService.get('TATUM_API_KEY')}`,
        })
        .then(async (result: any) => {
          let subscriptionData = Object.assign(
            {
              id: result.id,
            },
            data,
          );

          const newSubscription = new this.subscriptionModel(subscriptionData);
          await newSubscription.save();

          return { success: true, data: result };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async cancelSubscription(req: any) {
    try {
      const id = req.id;

      const url =
        this.configService.get('TATUM_BASE_URL') +
        TatumEndPoints.cancelSubscription;

      const finalUrl = url + id;

      return this.tatumService
        .makePostRequest(
          'delete',
          finalUrl,
          {},
          {
            'x-testnet-type': 'ethereum-sepolia',
            'x-api-key': `${this.configService.get('TATUM_API_KEY')}`,
          },
        )
        .then(async (result: any) => {
          await this.subscriptionModel.remove({ id: id });

          return {
            success: true,
            message: 'Subscription cancelled successfully',
          };
        })
        .catch((err) => {
          return { success: false, error: err };
        });
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async getSubscriptions(query: any, limit: number, offset: number) {
    try {
      const result = await this.subscriptionModel
        .find(query)
        .limit(limit)
        .skip(offset);
      return result;
    } catch (err) {
      return err;
    }
  }

  async getSubscriptionCount(query: any) {
    try {
      const result = await this.subscriptionModel.countDocuments(query);
      return result;
    } catch (err) {
      return err;
    }
  }
}
