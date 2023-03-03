import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { VendorRepository } from './vendor.repository';

@Controller('vendor')
export class VendorController {
  constructor(
    private authService: AuthService,
    private vendorRepository: VendorRepository,
  ) {}

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  async vendorProfile(@Req() req) {
    console.log(req);
    const vendorDetails = await this.vendorRepository.vfindOne(req.user.email);
    console.log(vendorDetails);
    return vendorDetails;
  }
}
