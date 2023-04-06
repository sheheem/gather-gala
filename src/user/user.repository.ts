import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';

import { Repository } from 'nestjs-mongoose-generic-repository';
import { userDto } from 'src/dto/userAuth.dto';
import { AuthDto } from 'src/dto/authCredentials.dto';

@Injectable()
export class UserRepository extends Repository<UserDocument> {
  constructor(@InjectModel(User.name) private entity: Model<UserDocument>) {
    super(entity);
  }

  async signUp(userDto: userDto): Promise<User> {
    const user = await this.entity.findOne({ email: userDto.email });
    if (user) {
      throw new ConflictException('User Already Exists');
    } else {
      const createdUser = new this.entity(userDto);
      const salt = await bcrypt.genSalt();
      createdUser.password = await this.hashedPassword(
        createdUser.password,
        salt,
      );
      return createdUser.save();
    }
  }

  async signIn(authDto: AuthDto) {
    const user = await this.entity.findOne({ email: authDto.email });
    if (user) {
      const isMatch = await bcrypt.compare(authDto.password, user.password);
      if (isMatch) {
        return user;
      } else {
        throw new UnauthorizedException('Invalid Credentials');
      }
    } else {
      throw new ConflictException('Invalid Credentials');
    }
  }

  async ufindOne(email: string) {
    const user = await this.entity.findOne({ email: email });
    if (user) {
      return user;
    } else {
      throw new ConflictException('No Such User found');
    }
  }

  private async hashedPassword(
    password: string,
    salt: string,
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
