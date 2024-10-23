import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { LoginUserDto, CreateUserDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { Public, Roles, User } from '@modules/common/decorators';
import { JwtPayload, RoleType } from '@modules/common/types';
import { AtGuard, RtGuard } from '@modules/common/guards';

@ApiTags('users')
@Controller('users')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Public()
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @Public()
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

  @Roles(RoleType.ADMIN)
  @Get("")
  async findAll() {
    return this.userService.findAll();
  }
}
