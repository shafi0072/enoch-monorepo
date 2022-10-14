import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coupon, CouponDocument } from 'src/db/schemas/coupon.shema';
import DBService from './db.service';

@Injectable()
export default class CouponService extends DBService {
  constructor(
    @InjectModel(Coupon.name)
    private readonly couponModel: Model<CouponDocument>,
  ) {
    super(couponModel);
  }

  async createCoupon(coupon: Coupon) {
    const newCoupon = new this.couponModel(coupon);
    return await newCoupon.save();
  }

  async getCoupons() {
    return await this.couponModel.find({});
  }
}
