import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Subcategory,
  SubcategoryDocument,
} from 'src/db/schemas/subcategory.shema';
import DBService from './db.service';

@Injectable()
export default class SubcategoryService extends DBService {
  constructor(
    @InjectModel(Subcategory.name)
    private readonly subcategoryDocument: Model<SubcategoryDocument>,
  ) {
    super(subcategoryDocument);
  }

  createSubcategory(subcategory: Subcategory) {
    const newSubcategory = new this.subcategoryDocument(subcategory);
    return newSubcategory.save();
  }

  getSubCategories(categoryId: string) {
    return this.subcategoryDocument.find({ categoryId: categoryId });
  }

  getAllSubCategories() {
    return this.subcategoryDocument.find({});
  }

  async updateCollection(id, collectionId){
    return await this.subcategoryDocument.findOneAndUpdate({_id:id},{collectionId: collectionId});
  }
}
