import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { Order, orderSchema } from './order.schema';
import { OrderService } from './order.service';
import { StripeModule } from 'nestjs-stripe';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }]),
    forwardRef(() => AuthModule),
    StripeModule.forRoot({
      apiKey: process.env.STRIPESECRETID,
      apiVersion: '2022-11-15',
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
