import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";


export class CreateUserDto {
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}