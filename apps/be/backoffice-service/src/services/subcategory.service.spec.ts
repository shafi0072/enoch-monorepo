import { testModuleRef } from '../../test/utils';
import SubcategoryService from './subcategory.service';
import { Subcategory } from '../db/schemas/subcategory.shema';

describe('SubcategoryService', () => {
  let subcategoryService: SubcategoryService;

  beforeEach(async () => {
    const moduleRef = await testModuleRef.compile();
    subcategoryService = moduleRef.get(SubcategoryService);
  });

  it('should be defined', () => {
    expect(subcategoryService).toBeDefined();
  });

  describe('createSubcategory', () => {
    it('should create subcategory', async () => {
      let input: Subcategory = {
        name: 'test_subcategory',
        description: 'test purpose',
        categoryId: '630ddf0a8cc6122418d4a3d6',
        createdBy: '6305ec4522a4c903e37936c9',
      };

      const testCategory = await subcategoryService.createSubcategory(input);
      expect(testCategory).toBeDefined();
      expect(testCategory.name).toBe('test_subcategory');
      expect(testCategory.description).toBe('test purpose');
    });
  });

  describe('getSubCategories', () => {
    it('should return subcategories for given categoryId', async () => {
      const testCategory = await subcategoryService.getSubCategories(
        '630ddf0a8cc6122418d4a3d6',
      );
      expect(testCategory).toBeDefined();
      expect(testCategory).toBeInstanceOf(Array);
      expect(testCategory[0].name).toBe('test_subcategory');
      expect(testCategory[0].description).toBe('test purpose');
    });
  });
});
