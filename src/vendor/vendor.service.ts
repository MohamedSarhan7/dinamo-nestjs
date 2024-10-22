
import { Injectable, NotFoundException } from '@nestjs/common';
import { Vendor } from '@modules/vendor/schemas/vendor.schema';
import { CreateVendorDto, UpdateVendorDto } from './dto';
import { VendorRepository } from '@modules/vendor/vendor.repository';
import { Types } from 'mongoose';

@Injectable()
export class VendorService {
  constructor(private readonly vendorRepo: VendorRepository) { }

  async create(CreateVendorDto: CreateVendorDto): Promise<Vendor> {
    return this.vendorRepo.create(CreateVendorDto);
  }

  async findAll(searchValue?: string,
    page = 1,
    limit = 10,
    sortField: keyof Vendor = 'name',
    sortOrder: 'asc' | 'desc' = 'asc',): Promise<{data:Vendor[], total: number}> {

      const options= {searchValue, page, limit, sortField, sortOrder ,searchField: 'name' as keyof Vendor};
    return this.vendorRepo.findAll({}, options);
  }

  async findOne(id: Types.ObjectId): Promise<Vendor> {
    const product = await this.vendorRepo.findById(id);
    if (!product) {
      throw new NotFoundException(`Vendor with ID ${id} not found`);
    }
    return product;
  }

  async update(id: Types.ObjectId, updateProductDto: UpdateVendorDto): Promise<Vendor> {


    const updatedProduct = await this.vendorRepo.update(id, updateProductDto);
    if (!updatedProduct) {
      throw new NotFoundException(`Vendor with ID ${id} not found`);
    }
    return updatedProduct;
  }

  async remove(id: Types.ObjectId): Promise<any> {
    const result = await this.vendorRepo.delete(id);
    if (!result) {
      throw new NotFoundException(`Vendor with ID ${id} not found`);
    }
    return { "message": `Vendor with ID ${id} deleted successfully` };
  }
}
