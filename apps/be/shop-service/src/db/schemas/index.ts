import { User, UserSchema } from './users.shema';
import { Banner, BannerSchema } from './banner.shema';
import { Coupon, CouponSchema } from './coupon.shema';
import { Shop, ShopSchema } from './shop.shema';
import { ShopItem, ShopItemSchema } from './shopItems.shema';
import { LikeNft, LikeNftSchema } from './likeNft.shema';
import { Nft, NftSchema } from './nft.shema';

export const schemas = [
  {
    name: User.name,
    schema: UserSchema,
  },
  {
    name: Banner.name,
    schema: BannerSchema,
  },
  {
    name: Coupon.name,
    schema: CouponSchema,
  },
  {
    name: Shop.name,
    schema: ShopSchema,
  },
  {
    name: ShopItem.name,
    schema: ShopItemSchema,
  },
  {
    name: LikeNft.name,
    schema: LikeNftSchema,
  },
  {
    name: Nft.name,
    schema: NftSchema,
  },
];
