import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nft, NftDocument } from 'src/db/schemas/nft.shema';
import { LikeNft, LikeNftDocument } from 'src/db/schemas/likeNft.shema';
import DBService from './db.service';

@Injectable()
export default class NftService extends DBService {
  constructor(
    @InjectModel(Nft.name)
    private readonly nftModel: Model<NftDocument>,
    @InjectModel(LikeNft.name)
    private readonly likeNftModel: Model<LikeNftDocument>,
  ) {
    super(nftModel);
  }

  async likeNft(likeNft: LikeNft) {
    const newNft = new this.likeNftModel(likeNft);
    return await newNft.save();
  }
}
