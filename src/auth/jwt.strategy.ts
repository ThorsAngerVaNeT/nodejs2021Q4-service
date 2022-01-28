import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
// import { jwtConstants } from './constants';
import config from '../config/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config().JWT_SECRET_KEY,
    });
  }

  async validate(payload: { userId: string; login: string }) {
    return { id: payload.userId, login: payload.login };
  }
}
