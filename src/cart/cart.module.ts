import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartRepository } from './cart.repository';
import {Cart , CartSchema} from './schemas/cart.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from '@modules/product/product.service';
import { ProductRepository } from '@modules/product/product.repository';
import { ProductModule } from '@modules/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]),
    ProductModule
  ],
  providers: [CartService, CartRepository],
  controllers: [CartController]
})
export class CartModule {}
