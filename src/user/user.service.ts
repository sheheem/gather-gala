import { BadRequestException, Injectable, Req } from '@nestjs/common';
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
}
