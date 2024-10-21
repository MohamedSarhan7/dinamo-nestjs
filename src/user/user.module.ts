import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from '@modules/common/strategies';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({secret:process.env.AT_SECRET_KEY ||`secret`}),
  ],
  providers: [UserService, UserRepository, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [UserController],
  exports: [UserService, UserRepository, AccessTokenStrategy, RefreshTokenStrategy],

})
export class UserModule { }
