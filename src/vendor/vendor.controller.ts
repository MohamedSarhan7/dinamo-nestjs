import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { VendorService } from '@modules/vendor/vendor.service';
import { CreateVendorDto, UpdateVendorDto } from '@modules/vendor/dto';
import { Vendor } from '@modules/vendor/schemas/vendor.schema';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
@ApiTags('Vendor')
@Controller('vendor')
export class VendorController {

  constructor(private readonly vendorService: VendorService) { }
@Post()
  async create(CreateVendorDto: CreateVendorDto): Promise<Vendor> {
    return  this.vendorService.create(CreateVendorDto);
  }
  @Get()
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'sortField', required: false, type: String, example: 'name' })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'], example: 'asc' })
  async findAll(@Query('search') searchValue?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('sortField') sortField = 'name' as keyof Vendor,
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',): Promise<{ data: Vendor[], total: number }> {
    return  this.vendorService.findAll(searchValue, page, limit, sortField, sortOrder);
  }

  @Get(':id')
  async findOne(id: Types.ObjectId): Promise<Vendor> {
    return  this.vendorService.findOne(id);
  }

  @Put(':id')
  async update(id: Types.ObjectId, updateVendorDto: UpdateVendorDto): Promise<Vendor> {
    return  this.vendorService.update(id, updateVendorDto);
  }

  @Delete(':id')
  async remove(id: Types.ObjectId): Promise<any> {
    return  this.vendorService.remove(id);
  }
}
