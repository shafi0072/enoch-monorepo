import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import DBService from './db.service';
import {
  CommentLike,
  CommentLikeDocument,
} from '../db/schemas/commentLike.schema';

@Injectable()
export default class CommentLikeService extends DBService {
  prefix = 'cml';
  idField: string = 'commentLike';
  constructor(
    @InjectModel(CommentLike.name)
    private readonly commnetLikesModel: Model<CommentLikeDocument>,
  ) {
    super(commnetLikesModel);
  }

  async addLike(postId, commentId, user) {
    return await this.commnetLikesModel.create({
      user: user._id,
      postId,
      commentId,
    });
  }
  async unlikeComment(postId, commentId, user) {
    try {
      const like = await this.commnetLikesModel.findOne({
        postId,
        commentId,
        user: user._id,
      });
      await like.remove();
    } catch (e) {
      throw new Error(e);
    }
  }
}
