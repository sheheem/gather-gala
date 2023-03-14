import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConstants } from 'auth.constants';
import { Strategy, ExtractJwt } from 'passport-jwt';
// import { UserTokenDto } from 'src/dto/user-token.dto';
import { UserRepository } from 'src/user/user.repository';
// import { User } from 'src/user/user.schema';
import { VendorRepository } from 'src/vendor/vendor.repository';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userRepository: UserRepository,
    private vendorRepository: VendorRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const { email, role } = payload;
    const user =
      role === 'user'
        ? await this.userRepository.ufindOne(email)
        : await this.vendorRepository.vfindOne(email);
    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
