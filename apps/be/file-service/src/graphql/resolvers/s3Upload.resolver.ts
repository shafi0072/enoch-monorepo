import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { s3UploadService } from 'src/services/s3Upload.service';

@Resolver()
export class s3UploadResolver {
  constructor(private readonly s3UploadService: s3UploadService) {}
  @Mutation(() => String)
  async FileUploadService(
    @Args('file', { type: () => GraphQLUpload }) file: FileUpload,
  ) {
    const result = this.s3UploadService.uploadFileGraphql(file);

    return result;
  }
}
