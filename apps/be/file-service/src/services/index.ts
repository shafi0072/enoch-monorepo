import { ImageUploadService } from './DOSpaceUpload.service';
import { PostMediaService } from './postMedia.service';
import { s3UploadService } from './s3Upload.service';

export const allServices = [
  s3UploadService,
  PostMediaService,
  ImageUploadService,
];
