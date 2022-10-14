import { S3Uploads, S3UploadsSchema } from './s3-schema/S3Uploads';
import { PostMedias, PostMediaSchema } from './s3-schema/postMedia';

export const schemas = [
  { name: S3Uploads.name, schema: S3UploadsSchema },
  { name: PostMedias.name, schema: PostMediaSchema },
];
