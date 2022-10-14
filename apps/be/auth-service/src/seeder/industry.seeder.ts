import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';
import { Industry, IndsutrySchema } from '../db/schemas/industry.schema';
import { industries } from 'src/shared/industry-category.data.';

@Injectable()
export class IndustrySeeder implements Seeder {
  constructor(
    @InjectModel(Industry.name) private readonly industry: Model<Industry>,
  ) {}

  async seed(): Promise<any> {
    return this.industry.insertMany(industries);
  }

  async drop(): Promise<any> {
    return this.industry.deleteMany({});
  }
}

export const IndustrySeederSchema = {
  name: Industry.name,
  schema: IndsutrySchema,
};
