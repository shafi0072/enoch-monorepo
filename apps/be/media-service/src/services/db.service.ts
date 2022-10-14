import { Model, Types } from 'mongoose';

abstract class DBService<T = any> {
  abstract prefix: string;
  abstract idField: string;
  Model: Model<T>;
  constructor(Model: Model<T>) {
    this.Model = Model;
  }

  async create(obj: T): Promise<any> {
    const model = new this.Model({ ...obj, ...this.defaultFields });
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

  get defaultFields() {
    const shortId = new Types.ObjectId();
    const id = `${this.prefix}_${shortId}`;
    return {
      [this.idField]: id,
      _id: shortId,
    };
  }
}

export default DBService;
