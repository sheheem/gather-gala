import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from 'src/dto/authCredentials.dto';
import { userDto } from 'src/dto/userAuth.dto';
import { VendorLogDto } from 'src/dto/vendorDTO/vendorLogin.dto';
import { VendorSignDto } from 'src/dto/vendorDTO/vendorSign.dto';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.schema';
import { VendorRepository } from 'src/vendor/vendor.repository';
import { Vendor } from 'src/vendor/vendor.schema';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private vendorRepository: VendorRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: userDto): Promise<User> {
    return this.userRepository.signUp(userDto);
  }

  async signIn(userDto: AuthDto): Promise<{ accessToken: string }> {
    const authorized = await this.userRepository.signIn(userDto);

    if (!authorized) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const payload: JwtPayload = {
      email: authorized.email,
      role: 'user',
    };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async vendorSignUp(vendorSignDto: VendorSignDto): Promise<VendorSignDto> {
    return this.vendorRepository.vendorSignUp(vendorSignDto);
  }

  async vendorSignIn(
    vendorLogDto: VendorLogDto,
  ): Promise<{ accessToken: string }> {
    const vendorAuthorized = await this.vendorRepository.vendorSignIn(
      vendorLogDto,
    );
    if (!vendorAuthorized) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const vendorPayload = {
      email: vendorAuthorized.email,
      role: 'vendor',
    };
    const accessToken = this.jwtService.sign(vendorPayload);
    return { accessToken };
  }
}
