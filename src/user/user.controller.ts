import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dto/updateUserDTO/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}

  @Get('/userProfile')
  @UseGuards(AuthGuard('jwt'))
  async userProflie(@Req() req) {
    const userDetails = await this._userService.userProfile(req);
    console.log(userDetails);
    return { profile: userDetails };
  }

  @Put('updateUser/:id')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Param() id: string, @Body() updateUserDto: UpdateUserDto) {
    return this._userService.updateProfile(id, updateUserDto);
  }
}
