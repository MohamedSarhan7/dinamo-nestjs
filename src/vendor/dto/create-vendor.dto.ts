import { IsEmail, IsMongoId, IsNotEmpty, IsString } from "class-validator";

import { Types } from "mongoose";

export class CreateVendorDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsMongoId()
  products: Types.ObjectId[]
}