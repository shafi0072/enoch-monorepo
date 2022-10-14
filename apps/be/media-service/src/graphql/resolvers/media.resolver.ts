import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Context } from '@nestjs/graphql';
import { TwoFAAuthGuard } from 'src/guards/two-fa-auth.guard';
import MediaService from '../../services/media.service';
import { AddMediaInput } from '../dto/add-media.input';
import { Media } from '../models/media.model';
import { MediaListDocument } from '../models/mediaList.document.model';
@Resolver(() => Media)
export class MediaResolver {
  constructor(private mediaService: MediaService) {}

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => MediaListDocument)
  listMedia(
    @Args('nextCursor', { nullable: true }) nextCursor: string,
    @Args('limit') limit: number,
  ) {
    return this.mediaService.listMedia(nextCursor, limit);
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => Media)
  addMedia(@Context() user, @Args('addMediaInput') input: AddMediaInput) {
    return this.mediaService.addMedia({
      title: input.title,
      category: input.category,
      thumbnail: input.thumbnail,
      hashtags: input.hashtags,
      privacyStatus: input.privacyStatus,
      pricePerView: input.pricePerView,
      video: input.video,
      userId: user.user._id,
    });
  }
}
