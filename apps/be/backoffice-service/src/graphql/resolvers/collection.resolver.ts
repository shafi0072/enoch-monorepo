import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import CollectionService from 'src/services/collection.service';
import { CreateCollectionDtoGql } from '../dto/create-collection.dto';
import { GqlAuthGuard } from 'src/guards/gql-auth.guard';
import { Collection } from '../models/collection.model';

@Resolver(() => Collection)
export class CollectionResolver {
  constructor(private readonly collectionService: CollectionService) {}

  @Mutation(() => Collection)
  createCollection(
    @Args('createCollectionInput') input: CreateCollectionDtoGql,
  ) {
    return this.collectionService.createCollection({
      image: input.image,
      name: input.name,
      symbol: input.symbol,
      supply: input.supply,
      categoryId: input.categoryId,
      subcategoryId: input.subcategoryId,
      isCategory: input.isCategory,
      description: input.description
    });
  }
}
