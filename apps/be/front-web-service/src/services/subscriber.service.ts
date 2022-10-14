import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBService from './db.service';
import { Subscriber, SubscriberDocument } from '../db/schemas/subscriber.schema';
import { ERROR_MESSAGES } from '../constant.json';


@Injectable()
export default class SubscriberService extends DBService<Subscriber> {
  prefix = 'cmnt';
  idField: string = 'subscriberID';
  constructor(
    @InjectModel(Subscriber.name)
    private readonly subscriberModel: Model<SubscriberDocument>,
  ) {
    super(subscriberModel);
  }

  async getSubscriberUnsentList(){
    try{
      const options: any = { is_sent: 0 };
      const subscriberData: any = await this.subscriberModel.find(options).select({email: 1, _id: 0});
      return subscriberData;
    } catch (e) {
      throw new Error(ERROR_MESSAGES.ALLOWED_USER_NOT_FOUND);
    }
  }

  async updateUnsent(email): Promise<Subscriber> {
    
    return await this.subscriberModel.findOneAndUpdate(
      { email: email},
      { is_sent: 1 }
    );
  }

  async addSubscriber(subscriber){

    try {
      const subscriberData = await this.subscriberModel.findOne({ email: subscriber.email }).select({ email: 1 });
      if(subscriberData){
        throw new BadRequestException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
      }else{
        const subscriberNew = await this.create({
          email: subscriber.email,
          is_sent: 0
          });
        return subscriberNew;
      }
    } catch (e) {
      throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
      //return e.response;
    }
    
  }

  async getSubscriber(){
    try{
      const subscriberAll: any = await this.subscriberModel.find().exec();
      console.log(subscriberAll);
      return subscriberAll;
    } catch (e) {
      return e.response;
    }
  }
}
