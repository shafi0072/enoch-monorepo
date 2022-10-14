import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Inject,
  Res,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ClientProxy, EventPattern, ClientKafka } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { s3UploadService } from '../services/s3Upload.service';
import { multerOptions } from './multer.options';
import { PostMediaService } from 'src/services/postMedia.service';
import { ImageUploadService } from 'src/services/DOSpaceUpload.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiQuery,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('upload')
export class s3UploadController {
  constructor(
    private readonly s3UploadService: s3UploadService,
    private readonly configService: ConfigService,
    private readonly postMediaService: PostMediaService,
    private readonly imageUploadService: ImageUploadService,
    @Inject('KAFKA_SERVICE') private natsServerClient: ClientKafka,
  ) {}

  @EventPattern('add-post_id')
  async userCreated({ resourceId, postId }) {
    return await this.postMediaService.updatePostId(resourceId, postId);
  }

  @Post('multi-Upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultipleFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<string[] | string> {
    const result = await this.s3UploadService.multiFileUploadRestApi(files);
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-single-with-static-path')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload(@UploadedFile() file, @Req() { user }: any) {
    const url = `${this.configService.get('FILE_URL')}/${file.filename}`;
    const media = await this.postMediaService.saveTodb({
      createdBy: user.id,
      CreatorsEmail: user.email,
      multerObject: file,
      fileUrl: url,
    });
    return { url, resourceId: media._id };
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-multiple-with-static-path')
  @UseInterceptors(FilesInterceptor('files', 5, multerOptions))
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() { user }: any,
  ) {
    const urls = await this.postMediaService.getUrls(files);
    const media = await this.postMediaService.saveTodb({
      createdBy: user.id,
      CreatorsEmail: user.email,
      multerObject: files,
      filesUrl: urls,
    });
    return { urls, resourceId: media._id };
  }

  @Post('single-file')
  @UseInterceptors(FileInterceptor('file'))
  uploadSingleFile(@UploadedFile() file: Express.Multer.File) {
    const result = this.s3UploadService.uploadFileRestApi(file);
    return result;
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'The file has been successfully uploaded.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBody({
    schema: {
      title: 'file',
      required: ['file'],
      type: 'file',
      description: 'File field which includes file',
      example: {
        file: 'File',
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @Post('do-m-upload')
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Req() request,
    @Res() response,
  ) {
    try {
      await this.imageUploadService.fileupload(request, response);
    } catch (error) {
      return response
        .status(500)
        .json(`Failed to upload image file: ${error.message}`);
    }
  }

  @ApiQuery({
    name: 'filename',
    description: 'Filename of the file to be uploaded',
  })
  @ApiResponse({
    status: 200,
    description: 'URL of signed URL',
  })
  @Get('create-presigned-url')
  async createSignedURL(@Query('filename') filename: string) {
    if (!filename) {
      throw new HttpException(
        'filename query is required!',
        HttpStatus.FORBIDDEN,
      );
    }
    const preSignedURL = await this.s3UploadService.createPreSignedURL(
      filename,
    );
    return preSignedURL;
  }

  @Get('list')
  async listObjects() {
    return this.s3UploadService.list();
  }

  @Post('deleteobj')
  async deleteObj() {
    await this.postMediaService.deleteObj();
  }
}
