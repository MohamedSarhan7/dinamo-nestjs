import { IsNotEmpty, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCartDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;
  @IsNotEmpty()
  @IsMongoId({ each: true })
  products: Types.ObjectId[];
}