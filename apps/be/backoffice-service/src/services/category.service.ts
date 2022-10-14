import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/db/schemas/category.shema';
import DBService from './db.service';

@Injectable()
export default class CategoryService extends DBService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryDocument: Model<CategoryDocument>
  ) {
    super(categoryDocument);
  }

  createCategory(category: Category) {
    const newCategory = new this.categoryDocument(category);
    return newCategory.save();
  }


  async findAll(args) {
    if(args.hasOwnProperty("hasSubcategory") && !args.hasSubcategory){
      return await this.categoryDocument.find({hasSubcategory: args.hasSubcategory}).limit(args.limit).skip(args.skip) as Category[];
    }else if(args.hasOwnProperty("hasSubcategory") && args.hasSubcategory){
      return await this.categoryDocument.find({hasSubcategory: args.hasSubcategory}) as Category[];
    }
    else{
      return await this.categoryDocument.find({}) as Category[];
    }
  }

  async getCount(): Promise<number> {
    return await this.categoryDocument.countDocuments({hasSubcategory:false})
  }

  async updateCollection(id, collectionId){
    return await this.categoryDocument.findOneAndUpdate({_id:id},{collectionId: collectionId});
  }

}
