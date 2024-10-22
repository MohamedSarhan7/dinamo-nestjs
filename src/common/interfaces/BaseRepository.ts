import { Model, FilterQuery, UpdateQuery,Document, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { FindAllOptions } from './findAllOptions.interface';

@Injectable()
export abstract class BaseRepository<T extends Document> {
  constructor( private readonly model: Model<T>) { }

  async create(createDto: Partial<T>): Promise<T> {
    const createdDocument = new this.model(createDto);
    return createdDocument.save() ;
  }


  async findById(id: Types.ObjectId): Promise<T> {
    return  this.model.findById(id).exec();
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    return this.model.findOne(filterQuery).exec();
  }

  async findAll(filterQuery: FilterQuery<T> = {},
    options: FindAllOptions<T>  = {}): Promise<{data:T[], total:number}> {
    const { searchField, searchValue, limit = 10, page = 1, sortField = 'createdAt', sortOrder = 'asc' } = options;

    if (searchField && searchValue) {
      filterQuery[searchField as keyof T] = searchValue as any; 
    }

    const skip = (page - 1) * limit;
    const sortOptions = {
      [sortField]: sortOrder === 'asc' ? 1 : -1, } as Record<string, 1 | -1>; 

    const data = await this.model
      .find(filterQuery)
      .limit(limit)
      .skip(skip)
      .sort(sortOptions)
      .exec();

    const total = await this.model.countDocuments(filterQuery).exec();

    return { data, total };
    // return this.model.find(filterQuery).exec();
  }

  async update(id: Types.ObjectId, updateDto: UpdateQuery<T>): Promise<T> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async delete(id: Types.ObjectId): Promise<T> {
    return this.model.findByIdAndDelete(id).exec();
  }

}
