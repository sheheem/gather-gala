import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '@nestjs/passport';
import { OrderDto } from 'src/dto/orderDTO/order.dto';
import Stripe from 'stripe';
import { InjectStripe } from 'nestjs-stripe';
import { create } from 'domain';

@Controller('order')
export class OrderController {
  constructor(
    private _orderService: OrderService,
    @InjectStripe() private readonly stripeClient: Stripe,
  ) {}

  @Post('/checkOut')
  @UseGuards(AuthGuard('jwt'))
  async orderCheckOut(@Body(ValidationPipe) createOrder: OrderDto) {
    const checkOut = await this._orderService.orderCheckOut(createOrder);

    // console.log(source);
    // if(source.payment_status === 'unpaid') {
    //   return;
    // }
    return checkOut;
  }

  @Post('/orderProcess')
  @UseGuards(AuthGuard('jwt'))
  async orderProcess(@Body(ValidationPipe) createOrder: OrderDto) {
    console.log(createOrder);

    const source = await this.stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: createOrder.ticketPrice * 100,
            product_data: {
              name: createOrder.ticketType,
            },
          },
          quantity: createOrder.totalTickets,
        },
      ],
      mode: 'payment',
      success_url:
        'http://localhost:4200/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:4200/cancel',
      metadata: {
        eventId: createOrder.eventId,
        userId: createOrder.userId,
        ticketId: createOrder.ticketId,
        eventName: createOrder.eventName,
        ticketType: createOrder.ticketType,
        totalPrice: createOrder.totalPrice,
        totalTickets: createOrder.totalTickets,
        ticketPrice: createOrder.ticketPrice,
      },
    });
    return { sessionId: source.id };
  }

  @Get('/success')
  @UseGuards(AuthGuard('jwt'))
  async orderSuccess(@Query('session_id') sessionId: string) {
    console.log(sessionId);

    const session = await this.stripeClient.checkout.sessions.retrieve(
      sessionId,
    );
    // console.log(session.metadata);
    if (session.payment_status === 'paid') {
      const checkOut = await this._orderService.orderCheckOut(session);
      return checkOut;
    } else {
      throw new Error('Payment Failed');
    }
  }
}
