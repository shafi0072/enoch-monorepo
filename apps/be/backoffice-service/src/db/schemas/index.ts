import { User, UserSchema } from './users.shema';
import { Category, CategorySchema } from './category.shema';
import { Subcategory, SubcategorySchema } from './subcategory.shema';
import { Collection, CollectionSchema } from './collection.shema';
import { Nft, NftSchema } from './nft.shema';

export const schemas = [
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: Category.name,
    schema: CategorySchema,
  },
  {
    name: Subcategory.name,
    schema: SubcategorySchema,
  },
  {
    name: Collection.name,
    schema: CollectionSchema,
  },
  {
    name: Nft.name,
    schema: NftSchema,
  },
];
