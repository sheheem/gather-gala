import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { S3Service } from './s3.service';

@Controller('s3Url')
export class S3Controller {
  constructor(private _s3Service: S3Service) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async generateUrl() {
    const url = await this._s3Service.generateUploadUrl();
    return { url };
  }
}
