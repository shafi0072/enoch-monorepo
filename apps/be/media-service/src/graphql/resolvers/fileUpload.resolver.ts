import { UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver, Context, Args } from '@nestjs/graphql';
import { TwoFAAuthGuard } from 'src/guards/two-fa-auth.guard';
import FileUploadService from 'src/services/fileUpload.service';
import { SignedUrl } from '../models/signedUrl.model';

@Resolver(() => SignedUrl)
export class FileUploadResolver {
  constructor(private fileUploadService: FileUploadService) {}

  @UseGuards(TwoFAAuthGuard)
  @Query(() => SignedUrl)
  getSignedUrl() {
    return this.fileUploadService.getSignedUrl();
  }

  @UseGuards(TwoFAAuthGuard)
  @Mutation(() => SignedUrl)
  getSignedDownloadUrl(@Context() user, @Args('mediaId') mediaId: string) {
    return this.fileUploadService.getSignedDownloadUrl(user.user._id, mediaId);
  }
}
