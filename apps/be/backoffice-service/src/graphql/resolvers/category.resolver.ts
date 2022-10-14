import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import CategoryService from 'src/services/category.service';
import SubcategoryService from 'src/services/subcategory.service';
import { CreateCategoryDtoGql } from '../dto/create-category.dto';
import { CreateSubcategoryDtoGql } from '../dto/create-subcategory.dto';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { CurrentUser } from 'src/decorators/current-user-decorator';
import { Category } from '../models/category.model';
import { Subcategory } from '../models/subcategory.model';
import { ListCategories } from '../dto/list-categories.dto';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService, private readonly subcategoryService: SubcategoryService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Category)
  createCategory(
    @CurrentUser() user,
    @Args('createCategoryInput') input: CreateCategoryDtoGql,
  ) {
    return this.categoryService.createCategory({
      image: input.image,
      name: input.name,
      hasSubcategory: input.hasSubcategory,
      description: input.description,
      createdBy: user.id,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Subcategory)
  createSubcategory(
    @CurrentUser() user,
    @Args('createSubcategoryInput') input: CreateSubcategoryDtoGql,
  ) {
    return this.subcategoryService.createSubcategory({
      name: input.name,
      categoryId: input.categoryId,
      description: input.description,
      createdBy: user.id,
    });
  }

  @Query(() => [Category], { name: 'categories' })
  findAllCategories(@Args() args:ListCategories ) {
    return this.categoryService.findAll(args);
  }

  @Query(() => Number, { name: 'count' })
  getCount(): Promise<number> {
    return this.categoryService.getCount()
  }

  @Query(() => [Subcategory], { name: 'subCategoriesByCategoryId' })
  getSubCategories(@Args('categoryId') categoryId: string) {
    return this.subcategoryService.getSubCategories(categoryId);
  }

  @Query(() => [Subcategory],{ name: 'allSubCategories' })
  getAllSubCategories(){
    return this.subcategoryService.getAllSubCategories();
  }
}
