import { testModuleRef } from '../../test/utils';
import CategoryService from './category.service';
import { Category } from '../db/schemas/category.shema';
import { Subcategory } from '../db/schemas/subcategory.shema';

describe('CategoryService', () => {
  let categoryService: CategoryService;

  beforeEach(async () => {
    const moduleRef = await testModuleRef.compile();
    categoryService = moduleRef.get(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  describe('createCategory', () => {
    it('should create category', async () => {
      let input: Category = {
        name: 'test',
        description: 'test purpose',
        image: 'www.google.com',
        hasSubcategory: false,
        createdBy: '6305ec4522a4c903e37936c9',
      };

      const testCategory = await categoryService.createCategory(input);
      expect(testCategory).toBeDefined();
      expect(testCategory.name).toBe('test');
      expect(testCategory.description).toBe('test purpose');
      expect(testCategory.image).toBe('www.google.com');
      expect(testCategory.hasSubcategory).toBe(false);
    });
  });

  describe('getFilteredCategoies', () => {
    it('should return all categories', async () => {
      const testCategory = await categoryService.findAll({});
      expect(testCategory).toBeDefined();
      expect(testCategory).toBeInstanceOf(Array);
      expect(testCategory[0].name).toBe('test');
      expect(testCategory[0].description).toBe('test purpose');
      expect(testCategory[0].image).toBe('www.google.com');
      expect(testCategory[0].hasSubcategory).toBe(false);
    });

    it('should return categories which has subcategory', async () => {
      let input: Category = {
        name: 'test_has_category',
        description: 'test purpose',
        image: 'www.google.com',
        hasSubcategory: true,
        createdBy: '6305ec4522a4c903e37936c9',
      };

      const newTestCategory = await categoryService.createCategory(input);
      const testCategory = await categoryService.findAll({
        hasSubcategory: true,
      });
      expect(testCategory).toBeDefined();
      expect(testCategory).toBeInstanceOf(Array);
      expect(testCategory[3].name).toBe('test_has_category');
      expect(testCategory[3].description).toBe('test purpose');
      expect(testCategory[3].image).toBe('www.google.com');
      expect(testCategory[3].hasSubcategory).toBe(true);
    });

    it('should return categories which does not have subcategory', async () => {
      let input: Category = {
        name: 'test_has_not_category',
        description: 'test purpose',
        image: 'www.google.com',
        hasSubcategory: false,
        createdBy: '6305ec4522a4c903e37936c9',
      };

      const newTestCategory = await categoryService.createCategory(input);
      const testCategory = await categoryService.findAll({
        hasSubcategory: false,
        skip:0,
        limit:5
      });
      expect(testCategory).toBeDefined();
      expect(testCategory).toBeInstanceOf(Array);
      expect(testCategory[4].name).toBe('test_has_not_category');
      expect(testCategory[4].description).toBe('test purpose');
      expect(testCategory[4].image).toBe('www.google.com');
      expect(testCategory[4].hasSubcategory).toBe(false);
    });
  });

});
