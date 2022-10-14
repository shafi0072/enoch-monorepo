import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBService from './db.service';
import {
  PostResource,
  PostResourceDocument,
} from 'src/db/schemas/postResource.schema';
import { ResourcesMetaData } from 'src/graphql/dto/media-metadata';
import users from 'src/db/migrations/dummyData/users';
import { User } from 'src/db/schemas/user.schema';

@Injectable()
export default class PostResourceService extends DBService {
  prefix = 'ptr';
  idField = 'postResId';
  constructor(
    @InjectModel(PostResource.name)
    private readonly postResource: Model<PostResourceDocument>,
  ) {
    super(postResource);
  }

  async createResource(
    mediaMetadata: Array<ResourcesMetaData>,
    post: any,
    type: string,
    user: User,
  ) {
    return await Promise.all(
      mediaMetadata.map(async (media) => {
        const resource = await this.create({
          user: user._id,
          url: media.location,
          post: post._id,
          type: type,
          ...media,
        });
        return resource._id;
      }),
    );
  }
}
