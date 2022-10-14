import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nft, NftDocument } from 'src/db/schemas/nft.shema';
import DBService from './db.service';
import { CreateNftDtoGql } from '../graphql/dto/create-nft.dto';

@Injectable()
export default class NftService extends DBService {
  constructor(
    @InjectModel(Nft.name)
    private readonly nftDocument: Model<NftDocument>
  ) {
    super(nftDocument);
  }

  async createNft(nft: CreateNftDtoGql) {
    const newCollection = new this.nftDocument(nft);
    return newCollection.save();
  }

  async getCount(): Promise<number> {
    return await this.nftDocument.countDocuments({})
  }

  async findAll(args) {
    return await this.nftDocument.find({}).limit(args.limit).skip(args.skip) as Nft[];
  }

}