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
import { OrderModule } from './order/order.module';
import { OrderController } from './order/order.controller';
import { StripeModule } from './stripe/stripe/stripe.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    VendorModule,
    EventModule,
    OrderModule,
    StripeModule.forRoot(process.env.STRIPESECRETID, {
      apiVersion: '2022-11-15',
    }),
  ],
  controllers: [AppController, UserController, S3Controller, OrderController],
  providers: [AppService, AuthService, JwtService, S3Service],
})
export class AppModule {}
