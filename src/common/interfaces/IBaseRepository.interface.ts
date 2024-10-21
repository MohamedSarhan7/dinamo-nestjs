import { Model, FilterQuery, UpdateQuery,Document } from 'mongoose';

export interface IBaseRepository<T extends Document> {

    create(createDto: Partial<T>): Promise<T> 
    findById(id: string): Promise<T> 
    findOne(filterQuery: FilterQuery<T>): Promise<T> 
    findAll(filterQuery: FilterQuery<T> ): Promise<T[]>
    update(id: string, updateDto: UpdateQuery<T>): Promise<T> 
    delete(id: string): Promise<T> 

}
