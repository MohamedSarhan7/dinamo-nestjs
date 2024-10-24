import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '@modules/common/types';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AT_SECRET_KEY ||`secret`,
    });
  }
  validate(payload: JwtPayload) {
    if (payload.exp < Date.now() / 1000) {
      throw new ForbiddenException('Token has expired');
    }
    // console.log(payload);
    return payload;
  }
}