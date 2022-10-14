import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Media, MediaDocument } from 'src/db/schemas/media.schema';
import DBService from './db.service';

@Injectable()
export default class MediaService extends DBService {
  prefix = 'media';
  idField = 'mediaId';

  constructor(
    @InjectModel(Media.name) private readonly mediaModel: Model<MediaDocument>,
  ) {
    super(mediaModel);
  }

  // Add Media.
  async addMedia(addMediaData: Media): Promise<Media> {
    const newMedia = new this.mediaModel(addMediaData);
    return newMedia.save();
  }

  // List Media.
  async listMedia(nextCursor, limit) {
    try {
      const mediaList: any = await this.mediaModel.find().limit(limit).lean();
      if (mediaList.length) {
        const startPosition = 0;
        const endPosition =
          mediaList.length > limit
            ? mediaList.length - 2
            : mediaList.length - 1;
        const startCursor = nextCursor;
        const startId = mediaList[startPosition]._id;
        const endCursor = parseInt(nextCursor) + 1;
        const endId = mediaList[endPosition]._id;
        const hasMoreMedia = mediaList.length > limit ? true : false;
        return {
          startId,
          endId,
          hasMoreMedia,
          startCursor,
          media:
            mediaList.length > limit
              ? mediaList.slice(startPosition, endPosition + 1)
              : mediaList,
          endCursor,
        };
      }
      return {};
    } catch (err) {
      throw new Error(err);
    }
  }
}
