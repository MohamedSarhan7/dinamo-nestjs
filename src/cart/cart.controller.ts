import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CartService } from '@modules/cart/cart.service';
import { CreateCartDto, UpdateCartDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';

@ApiTags('Cart')
@Controller('cart')
export class CartController {

  constructor(private readonly cartService: CartService) {}
  @Post()
  async createCart(@Body() cart: CreateCartDto) {
    return await this.cartService.createCart(cart);
  }
  @Get(":id")
  async getCart(@Param('id') id: Types.ObjectId) {
    return await this.cartService.getCart(id);
  }
  @Put(':id')
  async updateCart(@Param('id') id: Types.ObjectId,@Body() cart: UpdateCartDto) {
    return await this.cartService.updateCart(id,cart);
  }

  @Delete(':id')
  async deleteCart(@Param('id') id: Types.ObjectId) {
    return await this.cartService.deleteCart(id);
  }
}
