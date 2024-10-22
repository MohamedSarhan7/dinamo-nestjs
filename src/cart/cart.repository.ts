import { Injectable } from "@nestjs/common";
import { Cart, CartDocument } from '@modules/cart/schemas/cart.schema';
import { BaseRepository } from '@modules/common/interfaces/BaseRepository';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class CartRepository extends BaseRepository<Cart> {
  constructor(@InjectModel(Cart.name) private productModel: Model<CartDocument>) {
    super(productModel);
  }
}