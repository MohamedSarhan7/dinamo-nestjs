import { Body, Controller, Post, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ApiTags, ApiQuery, ApiOperation, ApiResponse, } from '@nestjs/swagger';
import { isMongoId } from '../common/pipes';
import { Product } from '@modules/product/schemas/product.schema';
import { Types } from 'mongoose';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  // @ApiOperation({ summary: 'Create cat' })
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  @Get()
  // @ApiOperation({ summary: 'Create cat' })

  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'sortField', required: false, type: String, example: 'name' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], example: 'asc' })
  async findAll(
    @Query('search') searchValue?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sortField') sortField = 'name' as keyof Product,
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',) {
    return this.productService.findAll(searchValue, page, limit, sortField, sortOrder);
  }

  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', isMongoId) id: Types.ObjectId, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id', isMongoId) id: Types.ObjectId) {
    return this.productService.remove(id);
  }
}