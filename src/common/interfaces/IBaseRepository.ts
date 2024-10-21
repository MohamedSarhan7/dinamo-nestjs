import { Model, FilterQuery, UpdateQuery,Document } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class BaseRepository<T extends Document> {
  constructor( private readonly model: Model<T>) { }

  async create(createDto: Partial<T>): Promise<T> {
    const createdDocument = new this.model(createDto);
    return createdDocument.save() ;
  }


  async findById(id: string): Promise<T> {
    return this.model.findById(id).exec();
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    return this.model.findOne(filterQuery).exec();
  }

  async findAll(filterQuery: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filterQuery).exec();
  }

  async update(id: string, updateDto: UpdateQuery<T>): Promise<T> {
    return this.model.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async delete(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).exec();
  }

}
