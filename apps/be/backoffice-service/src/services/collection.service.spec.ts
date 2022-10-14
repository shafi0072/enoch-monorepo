import { testModuleRef } from '../../test/utils';
import CollectionService from './collection.service';
import CategoryService from './category.service';
import SubcategoryService from './subcategory.service';
import { Collection } from '../db/schemas/collection.shema';
import { Category } from '../db/schemas/category.shema';
import { Subcategory } from '../db/schemas/subcategory.shema';
import { CreateCollectionDtoGql } from '../graphql/dto/create-collection.dto';

describe('CollectionService', () => {
  let collectionService: CollectionService;
  let categoryService: CategoryService;
  let subcategoryService: SubcategoryService;

  beforeEach(async () => {
    const moduleRef = await testModuleRef.compile();
    categoryService = moduleRef.get(CategoryService);
    collectionService = moduleRef.get(CollectionService);
    subcategoryService = moduleRef.get(SubcategoryService);
  });

  it('collection service should be defined', () => {
    expect(collectionService).toBeDefined();
  });

  it('category service should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  it('subcategory service should be defined', () => {
    expect(subcategoryService).toBeDefined();
  });

  describe('createCollection', () => {

    it('should create collection with subcategory', async () => {
          
      let input1: Subcategory = {
        name: 'test_subcategory',
        description: 'test purpose',
        categoryId: '630ddf0a8cc6122418d4a3d6',
        createdBy: '6305ec4522a4c903e37936c9',
      };

      const testCategory = await subcategoryService.createSubcategory(input1);

      let input: CreateCollectionDtoGql = {
        name: 'test_collection',
        description: 'test purpose',
        image: 'www.google.com',
        symbol: "t",
        supply: "1000",
        subcategoryId: testCategory._id,
        isCategory: false
      };

      const testCollection = await collectionService.createCollection(input);
      expect(testCollection).toBeDefined();
      expect(testCollection.name).toBe('test_collection');
      expect(testCollection.description).toBe('test purpose');
      expect(testCollection.image).toBe('www.google.com');
      const foundSubCategory = await subcategoryService.findById(testCategory._id);
      expect(foundSubCategory.collectionId).toStrictEqual(testCollection._id);

    });

    it('should create collection with category', async () => {
          
      let input1: Category = {
        name: 'test_has_category',
        description: 'test purpose',
        image: 'www.google.com',
        hasSubcategory: true,
        createdBy: '6305ec4522a4c903e37936c9',
      };

      const newTestCategory = await categoryService.createCategory(input1);

      let input: CreateCollectionDtoGql = {
        name: 'test_collection',
        description: 'test purpose',
        image: 'www.google.com',
        symbol: "t",
        supply: "1000",
        categoryId: newTestCategory._id,
        isCategory: true
      };

      const testCollection = await collectionService.createCollection(input);
      expect(testCollection).toBeDefined();
      expect(testCollection.name).toBe('test_collection');
      expect(testCollection.description).toBe('test purpose');
      expect(testCollection.image).toBe('www.google.com');
      const foundCategory = await categoryService.findById(newTestCategory._id);
      expect(foundCategory.collectionId).toStrictEqual(testCollection._id);

    });

  });

});
