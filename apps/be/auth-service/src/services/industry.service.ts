import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBService from './db.service';
import { Industry, IndustryDocument } from '../db/schemas/industry.schema';

@Injectable()
export default class IndustryService extends DBService {
  prefix = 'in';
  idField = 'industryId';
  constructor(
    @InjectModel(Industry.name)
    private readonly industry: Model<IndustryDocument>,
  ) {
    super(industry);
  }
}
