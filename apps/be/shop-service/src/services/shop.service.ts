import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from 'src/db/schemas/shop.shema';
import { ShopItem, ShopItemDocument } from 'src/db/schemas/shopItems.shema';
import DBService from './db.service';
import { PinItem } from '../shared/interfaces/pin-item-interface';
import { AllItems } from '../shared/interfaces/all-items-interface';
import { DeleteItem } from '../shared/enums/response-messages';
@Injectable()
export default class ShopService extends DBService {
  constructor(
    @InjectModel(Shop.name)
    private readonly shopModel: Model<ShopDocument>,
    @InjectModel(ShopItem.name)
    private readonly shopItemModel: Model<ShopItemDocument>,
  ) {
    super(shopModel);
  }

  async createShop(shop: Shop) {
    const newShop = new this.shopModel(shop);
    return await newShop.save();
  }

  async getShop(userId: string) {
    let res = await this.shopModel.aggregate([
      {
        $match: { userId: userId },
      },
      {
        $lookup: {
          from: 'shopitems',
          localField: '_id',
          foreignField: 'shopId',
          as: 'items',
        },
      },
    ]);
    return res;
  }

  async pinItem(args: PinItem) {
    return await this.shopItemModel.findOneAndUpdate(
      { _id: args.itemId },
      { isPinned: args.isPinned },
      { new: true },
    );
  }

  async deleteItem(itemId) {
    let res = await this.shopItemModel.deleteOne({ _id: itemId });
    if (res.deletedCount > 0) return DeleteItem.SUCCESS_MESSAGE;
    else return DeleteItem.FAILURE_MESSAGE;
  }

  async addItems(allItemsArgs: AllItems[]) {
    return await this.shopItemModel.insertMany(allItemsArgs);
  }
}
