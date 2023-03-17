import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { JwtService } from '@nestjs/jwt';
import { VendorModule } from './vendor/vendor.module';
import { EventModule } from './event/event.module';
import { S3Service } from './s3-bucket/s3.service';
import { S3Controller } from './s3-bucket/s3.controller';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    VendorModule,
    EventModule,
  ],
  controllers: [AppController, UserController, S3Controller],
  providers: [AppService, AuthService, JwtService, S3Service],
})
export class AppModule {}
