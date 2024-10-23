import { Injectable,BadRequestException } from '@nestjs/common';
import { UserRepository } from '@modules/user/user.repository';
import { LoginUserDto, CreateUserDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { Tokens,JwtPayload, RoleType } from '@modules/common/types';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,

  ) { }

  async loginUser(loginUserDto: LoginUserDto) {

    const user = await this.userRepository.findOne({ email: loginUserDto.email });
    if (!user) {
      throw new BadRequestException(`User with email ${loginUserDto.email} does not exist`);
    }
    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Password is not valid');
    }
    const tokens = await this.generateTokens(user.id, user.email, user.type);
    const rtHash = await this.hashData(tokens.refresh_token);
    await this.userRepository.update(user.id, { rtHashed: rtHash });
    return { user, ...tokens };
  }

  async createUser(createUserDto: CreateUserDto) {
    const emailExists = await this.userRepository.findOne({ email: createUserDto.email });
    if (emailExists) {
      throw new BadRequestException(`Email ${createUserDto.email} already exists`);
    }
    const hashedPassword = await this.hashData(createUserDto.password);
    createUserDto.password = hashedPassword;

    const user = await this.userRepository.create(createUserDto);
    const tokens = await this.generateTokens(user.id, user.email, user.type);
    const rtHash = await this.hashData(tokens.refresh_token);
    await this.userRepository.update(user.id, { rtHashed: rtHash });
    return { user, ...tokens };
  }

  async refreshTokens(jwtPayload: JwtPayload) {
    console.log("jwtPayload",jwtPayload)
    const user = await this.userRepository.findOne({ _id: jwtPayload.id,rtHashed: { $ne: null } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const rtMatches = await bcrypt.compare(jwtPayload.refreshToken, user.rtHashed);
    if (!rtMatches) {
      throw new BadRequestException('Invalid refresh token');
    }
    const tokens = await this.generateTokens(user.id, user.email, user.type);
    const rtHash = await this.hashData(tokens.refresh_token);
    await this.userRepository.update(user.id, { rtHashed: rtHash });
    return { user, ...tokens };
  }

  async findAll() {
    return await this.userRepository.findAll();
  }
  private async hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async generateTokens(id: Types.ObjectId, email: string, type: RoleType): Promise<Tokens> {
    const JwtPayload: JwtPayload = {
      id,
      email,
      type,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(JwtPayload, {
        secret: process.env.AT_SECRET_KEY,
        expiresIn: "15m",
      }),
      this.jwtService.signAsync(JwtPayload, {
        secret: process.env.RT_SECRET_KEY,
        expiresIn: "7d",
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
