import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}

  @Get('/userProfile')
  @UseGuards(AuthGuard('jwt'))
  async userProflie(@Req() req) {
    const userDetails = await this._userService.userProfile(req);
    return { profile: userDetails };
  }
}
