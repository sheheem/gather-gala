import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { Order, orderSchema } from './order.schema';
import { OrderService } from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [OrderController],
  providers: [OrderRepository, OrderService],
})
export class OrderModule {}
