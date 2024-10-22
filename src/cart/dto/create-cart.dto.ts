import { IsNotEmpty, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty()

  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @ApiProperty({ isArray: true ,type: Types.ObjectId})
  @IsNotEmpty()
  @IsMongoId({ each: true })
  products: Types.ObjectId[];
}