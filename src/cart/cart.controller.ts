import { Body, Controller, Post } from '@nestjs/common';
import { CartService } from '@modules/cart/cart.service';
import { CreateCartDto, UpdateCartDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {

  constructor(private readonly cartService: CartService) {}
  @Post()
  async createCart(@Body() cart: CreateCartDto) {
    return await this.cartService.createCart(cart);
  }
}
