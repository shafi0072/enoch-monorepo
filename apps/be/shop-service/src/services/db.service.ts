import { Model, Types } from 'mongoose';

abstract class DBService<T = any> {
  Model: Model<T>;
  constructor(Model: Model<T>) {
    this.Model = Model;
  }

  async create(obj: T): Promise<any> {
    const model = new this.Model({ ...obj });
    return model.save();
  }

  async find(options: any = {}) {
    return this.Model.find(options);
  }

  async findOne(options: any = {}) {
    return this.Model.findOne(options).exec();
  }

  async aggregate(options: any = {}) {
    return this.Model.aggregate(options);
  }

  update(model, updateObj): any {
    return this.Model.findByIdAndUpdate(model._id, updateObj, { new: true });
  }

  async findById(id) {
    return await this.Model.findById(id).exec();
  }
}

export default DBService;
