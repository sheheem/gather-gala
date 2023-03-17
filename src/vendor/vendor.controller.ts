import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VendorRepository } from './vendor.repository';

@Controller('vendor')
export class VendorController {
  constructor(private vendorRepository: VendorRepository) {}

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  async vendorProfile(@Req() req) {
    const vendorDetails = await this.vendorRepository.vfindOne(req.user.email);
    return { profile: vendorDetails };
  }
}
