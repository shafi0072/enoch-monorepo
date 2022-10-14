import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import {
  PostMedias,
  PostMediasDocument,
} from 'src/db/schemas/s3-schema/postMedia';

@Injectable()
export class PostMediaService {
  constructor(
    @InjectModel(PostMedias.name)
    private postMediaModel: Model<PostMediasDocument>,
    private readonly configService: ConfigService,
  ) {}

  async saveTodb(media: PostMedias) {
    try {
      const newMedia = new this.postMediaModel(media);
      return await newMedia.save();
    } catch {
      throw new Error("Please reupload the file can't store file on out db");
    }
  }

  //just for testing purpose remove it once testing is done
  async deleteObj() {
    const obj = await this.postMediaModel.findOneAndUpdate(
      { _id: '6283ae6eea64a751895ab46a' },
      {
        $pull: {
          multerObject: {
            _id: {
              $in: ['6283ae6eea64a751895ab46b', '6283ae6eea64a751895ab46c'],
            },
          },
        },
      },
      {
        new: true,
      },
    );
    console.log('obj', obj);
  }

  async updatePostId(resourceId: string, postId: string) {
    return await this.postMediaModel.findByIdAndUpdate(
      resourceId,
      { postId },
      { new: true },
    );
  }

  async getUrls(files: Array<Express.Multer.File>) {
    return files.map(file => {
      return `${this.configService.get('FILE_URL')}/${file.filename}`;
    });
  }
}
