import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBService from './db.service';
import { Jtenoch, JtenochDocument } from '../db/schemas/jtenoch.schema';
import { ERROR_MESSAGES } from '../constant.json';


@Injectable()
export default class JtenochService extends DBService<Jtenoch> {
  prefix = 'cmnt';
  idField: string = 'jtenochID';
  constructor(
    @InjectModel(Jtenoch.name)
    private readonly jtenochModel: Model<JtenochDocument>,
  ) {
    super(jtenochModel);
  }

  async getJtenochUnsentList(){
    try{
      const options: any = { is_sent: 0 };
      const jtenochData: any = await this.jtenochModel.find(options).select({email: 1, _id: 0});
      return jtenochData;
    } catch (e) {
      throw new Error(ERROR_MESSAGES.ALLOWED_USER_NOT_FOUND);
    }
  }

  async updateUnsent(email): Promise<Jtenoch> {
    
    return await this.jtenochModel.findOneAndUpdate(
      { email: email},
      { is_sent: 1 }
    );
  }

  async addJtenoch(jtenoch){

    try {
      const jtenochData = await this.jtenochModel.findOne({ email: jtenoch.email }).select({ email: 1 });
      if(jtenochData){
        throw new BadRequestException(ERROR_MESSAGES.USER_ALREADY_EXISTS);
      }else{
        const jtenochNew = await this.create({
          email: jtenoch.email,
          is_sent: 0
          });
        return jtenochNew;
      }
    } catch (e) {
      throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
      //return e.response;
    }
    
  }

  async getJtenoch(){
    try{
      const jtenochAll: any = await this.jtenochModel.find({}).exec();
      return jtenochAll;
    } catch (e) {
      return e.response;
    }
  }
}
