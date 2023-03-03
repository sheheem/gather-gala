import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User, userSchema } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
  ],
  exports: [UserService, UserRepository],
  providers: [UserService, UserRepository],
  controllers: [],
})
export class UserModule {}
