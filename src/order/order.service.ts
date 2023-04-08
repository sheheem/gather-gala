import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private _orderRepository: OrderRepository) {}

  async orderCheckOut(session) {
    const checkOut = await this._orderRepository.create({
      userId: session.metadata.userId,
      eventId: session.metadata.eventId,
      ticketId: session.metadata.ticketId,
      totalTickets: session.metadata.totalTickets,
      ticketType: session.metadata.ticketType,
      eventName: session.metadata.eventName,
      totalPrice: session.metadata.totalPrice,
      ticketPrice: session.metadata.ticketPrice,
    });
    return checkOut;
  }
}
