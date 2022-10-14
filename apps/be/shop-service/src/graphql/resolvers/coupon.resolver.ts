import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import CouponService from 'src/services/coupon.service';
import { CreateCouponDtoGql } from '../dto/create-coupon.dto';
import { Coupon } from '../models/coupon.model';

@Resolver(() => Coupon)
export class CouponResolver {
  constructor(private readonly couponService: CouponService) {}

  @Mutation(() => Coupon)
  createCoupon(@Args('createCouponInput') input: CreateCouponDtoGql) {
    return this.couponService.createCoupon({
      name: input.name,
      discount: input.discount,
      amount: input.amount,
      expiryDate: input.expiryDate,
    });
  }

  @Query(() => [Coupon])
  coupons() {
    return this.couponService.getCoupons();
  }
}
