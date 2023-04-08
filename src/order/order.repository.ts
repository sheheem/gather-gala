import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from 'nestjs-mongoose-generic-repository';
import { Order, OrderDocument } from './order.schema';
import { OrderDto } from 'src/dto/orderDTO/order.dto';

@Injectable()
export class OrderRepository extends Repository<OrderDocument> {
  constructor(@InjectModel(Order.name) private entity: Model<OrderDocument>) {
    super(entity);
  }

  async newOrder(orderDto: OrderDto): Promise<Order> {
    const newOrder = new this.entity(orderDto);
    return newOrder.save();
  }
}
