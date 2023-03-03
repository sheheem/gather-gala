import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User, userSchema } from '../user/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/user/user.repository';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { jwtConstants } from 'auth.constants';
import { JwtStrategy } from './jwt.strategy';
import { VendorModule } from 'src/vendor/vendor.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    UserModule,
    VendorModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  exports: [JwtStrategy, PassportModule, AuthService],
  providers: [AuthService, JwtStrategy, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
