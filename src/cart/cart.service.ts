import { Injectable } from '@nestjs/common';
import { CartRepository } from '@modules/cart/cart.repository';
import { Cart } from './schemas/cart.schema';
import { CreateCartDto } from './dto';
import { ProductService } from '../product/product.service';
@Injectable()
export class CartService {

  constructor(
    private readonly cartRepo: CartRepository,
    private readonly productService: ProductService
  ) { }


  async createCart(cart: CreateCartDto): Promise<Cart> {
    const newCart = {
      userId:cart.userId,
      products:cart.products,
      totalPrice:0
    } as Cart;

    
    const totalPrice = await this.calculateTotalPrice(newCart);
    newCart.totalPrice = totalPrice;
    return await this.cartRepo.create(newCart);
  }


  private async calculateTotalPrice(cart: Cart): Promise<number> {
    let totalPrice = 0;

    // Use a for...of loop to handle asynchronous operations correctly
    for (const product of cart.products) {
      const productPrice = await this.productService.findOne(product);
      totalPrice += productPrice.price;
    }

    return totalPrice;
  }


}
