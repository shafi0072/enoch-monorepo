import { Req, Res, Injectable } from '@nestjs/common';
import multer from 'multer';
const multerS3 = require('multer-s3');
import { v4 as uuidv4 } from 'uuid';
import { InjectS3, S3 } from 'nestjs-s3';
import { PostMediaService } from './postMedia.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageUploadService {
  constructor(
    @InjectS3() private readonly s3: S3,
    private readonly postMediaService: PostMediaService,
    private readonly configService: ConfigService,
  ) {}
  upload = multer({
    storage: multerS3({
      s3: this.s3,
      bucket: this.configService.get('AWS_BUCKET'),
      acl: 'public-read',
      key: function(request, file, cb) {
        const filepath = `UploadedFiles` + '/' + uuidv4() + file.originalname;
        cb(null, filepath);
      },
    }),
  }).array('upload', 10);

  async getUrls(files: any) {
    return files.map((file: any) => {
      return `${file?.location}`;
    });
  }

  async fileupload(@Req() req, @Res() res) {
    try {
      this.upload(req, res, async error => {
        if (error) {
          return res.status(404).json(`Failed to upload  file: ${error}`);
        }
        const urls = await this.getUrls(req.files);
        const media = await this.postMediaService.saveTodb({
          createdBy: req?.user?.id,
          CreatorsEmail: req?.user?.email,
          multerS3Object: req?.files,
          filesUrl: urls,
        });
        return res.status(201).json({
          media: media.multerS3Object,
          resourceId: media._id,
        });
      });
    } catch (error) {
      return res.status(500).json(`Failed to upload  file: ${error}`);
    }
  }
}
