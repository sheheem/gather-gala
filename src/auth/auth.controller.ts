import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, response } from 'express';
import { AuthDto } from 'src/dto/authCredentials.dto';
import { userDto } from 'src/dto/userAuth.dto';
import { VendorLogDto } from 'src/dto/vendorDTO/vendorLogin.dto';
import { VendorSignDto } from 'src/dto/vendorDTO/vendorSign.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) userDto: userDto) {
    return this.AuthService.signUp(userDto);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) userDto: AuthDto,
  ): Promise<{ accessToken: string }> {
    return this.AuthService.signIn(userDto);
  }

  // @Post('/test')
  // @UseGuards(AuthGuard('jwt'))
  // test(@Req() req) {
  //   console.log(req.user);
  // }

  @Post('/vendorsignup')
  vendorSignUp(@Body(ValidationPipe) vendorSignDto: VendorSignDto) {
    return this.AuthService.vendorSignUp(vendorSignDto);
  }

  @Post('/vendorsignin')
  vendorSignIn(
    @Body(ValidationPipe) vendorLogDto: VendorLogDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string }> {
    return this.AuthService.vendorSignIn(vendorLogDto);
  }
}
