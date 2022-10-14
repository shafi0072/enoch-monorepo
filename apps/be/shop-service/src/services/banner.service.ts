import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner, BannerDocument } from 'src/db/schemas/banner.shema';
import DBService from './db.service';

@Injectable()
export default class BannerService extends DBService {
  constructor(
    @InjectModel(Banner.name)
    private readonly bannerModel: Model<BannerDocument>,
  ) {
    super(bannerModel);
  }

  async createBanner(banner: Banner) {
    const newBanner = new this.bannerModel(banner);
    return await newBanner.save();
  }

  async getBanners() {
    return await this.bannerModel.find({});
  }
}
