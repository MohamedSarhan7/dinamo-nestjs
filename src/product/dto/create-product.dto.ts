import { IsNotEmpty, IsString, IsNumber, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsMongoId()
  vendor: Types.ObjectId;

  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
