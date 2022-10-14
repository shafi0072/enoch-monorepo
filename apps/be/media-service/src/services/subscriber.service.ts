import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBService from './db.service';
import {
  Subscriber,
  SubscriberDocument,
} from 'src/db/schemas/subscriber.schema';

@Injectable()
export default class SubscriberService extends DBService {
  prefix = 'subscriber';
  idField = 'subscriberId';

  constructor(
    @InjectModel(Subscriber.name)
    private readonly subscriberModel: Model<SubscriberDocument>,
  ) {
    super(subscriberModel);
  }

  async addSubscriber(addSubscriberData): Promise<Subscriber> {
    const addSubscriber = new this.subscriberModel(addSubscriberData);
    return addSubscriber.save();
  }
}
