import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder';

export abstract class AbstractSeeder implements Seeder {
  data: any[];
  model: Model<any>
  constructor(
    model: Model<any>,
  ) {
    this.model = model;
  }

  async seed(): Promise<any> {
    return this.model.insertMany(this.data);
  }

  async drop(): Promise<any> {
    return this.model.deleteMany({});
  }
}

