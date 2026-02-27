import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    const userId = payload.sub || payload.id;

    if (!userId) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }

    return user;
  }
}
