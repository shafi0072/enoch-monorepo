import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import BannerService from 'src/services/banner.service';
import { CreateBannerDtoGql } from '../dto/create-banner.dto';
import { Banner } from '../models/banner.model';

@Resolver(() => Banner)
export class BannerResolver {
  constructor(private readonly bannerService: BannerService) {}

  @Mutation(() => Banner)
  createBanner(@Args('createBannerInput') input: CreateBannerDtoGql) {
    return this.bannerService.createBanner({
      name: input.name,
    });
  }

  @Query(() => [Banner])
  banners() {
    return this.bannerService.getBanners();
  }
}
