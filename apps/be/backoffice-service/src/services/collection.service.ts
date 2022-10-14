import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection, CollectionDocument } from 'src/db/schemas/collection.shema';
import { CreateCollectionDtoGql } from '../graphql/dto/create-collection.dto';
import DBService from './db.service';
import CategoryService from './category.service';
import SubcategoryService from './subcategory.service';

@Injectable()
export default class CollectionService extends DBService {
  constructor(
    @InjectModel(Collection.name)
    private readonly collectionDocument: Model<CollectionDocument>,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService
  ) {
    super(collectionDocument);
  }

  async createCollection(collection: CreateCollectionDtoGql) {
    const newCollection = new this.collectionDocument(collection);
    let collectionRc = await newCollection.save();
    if(collection.isCategory){
      await this.categoryService.updateCollection(collection.categoryId, collectionRc._id);
    }
    await this.subcategoryService.updateCollection(collection.subcategoryId, collectionRc._id);
    return collectionRc;
  }

}