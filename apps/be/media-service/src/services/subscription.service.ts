import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBService from './db.service';
import {
  Subscription,
  SubscriptionDocument,
} from 'src/db/schemas/subscription.schema';

@Injectable()
export default class SubscriptionService extends DBService {
  prefix = 'subscription';
  idField = 'subscriptionId';

  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptionModel: Model<SubscriptionDocument>,
  ) {
    super(subscriptionModel);
  }

  findSubscriptionById(query) {
    return this.subscriptionModel.findOne(query);
  }

  async buySubscription(buySubscriptionData): Promise<Subscription> {
    const buySubscription = new this.subscriptionModel(buySubscriptionData);
    return buySubscription.save();
  }
}
