
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '@modules/product/schemas/product.schema';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductRepository } from '@modules/product/product.repository';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(private readonly productRepo: ProductRepository) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.productRepo.create(createProductDto);
  }

  async findAll(
    searchValue?: string,
    page = 1,
    limit = 10,
    sortField: keyof Product = 'name' ,
    sortOrder: 'asc' | 'desc' = 'asc',
  ): Promise<{data:Product[], total: number}> {
      const options= {searchValue, page, limit, sortField, sortOrder, searchField: 'name' as keyof Product};
    return this.productRepo.findAll({}, options);
  }

  async findOne(id: Types.ObjectId): Promise<Product> {
    const product = await this.productRepo.findById(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: Types.ObjectId, updateProductDto: UpdateProductDto): Promise<Product> {


    const updatedProduct = await this.productRepo.update(id, updateProductDto);
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: Types.ObjectId): Promise<any> {
    const result = await this.productRepo.delete(id);
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return {"message": `Product with ID ${id} deleted successfully`};
  }
}
