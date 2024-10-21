import { Injectable } from "@nestjs/common";
import { Product, ProductDocument } from '@modules/product/schemas/product.schema';
import { BaseRepository } from '@modules/common/interfaces/BaseRepository';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ProductRepository extends BaseRepository<Product> {
  constructor( @InjectModel(Product.name) private productModel: Model<ProductDocument>) {
    super(productModel);
  }
}