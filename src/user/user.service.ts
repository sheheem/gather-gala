import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async userProfile(req) {
    try {
      const userDetails = await this.userRepository.ufindOne(req.user.email);
      console.log(userDetails);
      return userDetails;
    } catch (err) {
      console.log(err);
      throw new BadRequestException();
    }
  }

  async updateProfile(id, updateUserDto) {
    try {
      console.log(updateUserDto, id.id);
      const updateProfile = await this.userRepository.updateOne(
        {
          _id: id.id,
        },
        {
          $set: updateUserDto,
        },
      );
      console.log(updateProfile);

      return updateProfile;
    } catch (err) {
      throw new NotFoundException('User Not Found');
    }
  }
}
