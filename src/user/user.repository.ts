import { Injectable } from "@nestjs/common";
import { User, UserDocument } from '@modules/user/schemas/user.schema';
import { BaseRepository } from '@modules/common/interfaces/BaseRepository';
import { Model } from 'mongoose';
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) private productModel: Model<UserDocument>) {
    super(productModel);
  }
}