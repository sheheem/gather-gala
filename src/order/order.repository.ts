import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from 'nestjs-mongoose-generic-repository';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderRepository extends Repository<OrderDocument> {
  constructor(@InjectModel(Order.name) private entity: Model<OrderDocument>) {
    super(entity);
  }
}
