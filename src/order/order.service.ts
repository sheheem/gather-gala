import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private _orderRepository: OrderRepository) {}

  async orderCheckOut(session) {
    const checkOut = await this._orderRepository.create({
      userId: session.metadata.userId,
      organizerId: session.metadata.organizerId,
      eventId: session.metadata.eventId,
      ticketId: session.metadata.ticketId,
      totalTickets: session.metadata.totalTickets,
      ticketType: session.metadata.ticketType,
      eventName: session.metadata.eventName,
      totalPrice: session.metadata.totalPrice,
      ticketPrice: session.metadata.ticketPrice,
      orderDate: session.metadata.orderDate,
    });
    return checkOut;
  }

  async orderByUser(userId) {
    const result = await this._orderRepository.find({ userId: userId });
    const populatedOrders = await Promise.all(
      result.map(async (order) => {
        const populatedOrder = await order.populate('eventId');
        return populatedOrder;
      }),
    );
    return result;
  }

  async orderByVendor(vendorId) {
    const result = await this._orderRepository.find({ organizerId: vendorId });
    return result;
  }
}
