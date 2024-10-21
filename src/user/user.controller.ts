import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { LoginUserDto, CreateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Public, User } from '@modules/common/decorators';
import { JwtPayload } from '@modules/common/types';
import { RtGuard } from '@modules/common/guards';

@ApiTags('users')
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) { }


  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }


  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  async refreshTokens(@User() user:JwtPayload) {
    return this.userService.refreshTokens(user);
  }
}
