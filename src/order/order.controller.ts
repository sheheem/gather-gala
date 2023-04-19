import {
  Body,
  Controller,
  Get,
  Param,
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
import { MailerService } from '@nestjs-modules/mailer';

@Controller('order')
export class OrderController {
  constructor(
    private _orderService: OrderService,
    @InjectStripe() private readonly stripeClient: Stripe,
    private mailerService: MailerService,
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
        'https://gathergala.online/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://gathergala.online/cancel',
      metadata: {
        eventId: createOrder.eventId,
        userId: createOrder.userId,
        organizerId: createOrder.organizerId,
        ticketId: createOrder.ticketId,
        eventName: createOrder.eventName,
        ticketType: createOrder.ticketType,
        totalPrice: createOrder.totalPrice,
        totalTickets: createOrder.totalTickets,
        ticketPrice: createOrder.ticketPrice,
        orderDate: createOrder.orderDate.toString(),
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
    console.log(session);

    if (session.payment_status === 'paid') {
      const checkOut = await this._orderService.orderCheckOut(session);
      // console.log(session);
      await this.mailerService.sendMail({
        to: 'shaheemzainudeen@gmail.com',
        subject: 'Welcome to our Gather Gala family!! ',
        // template: './template/email-template',
        text: 'hello',
        context: {
          name: session.customer_details.name,
          ticketId: session.metadata.ticketId,
        },
      });
      // console.log(session);
      return checkOut;
    } else {
      throw new Error('Payment Failed');
    }
  }

  @Get('/findTicket/:id')
  @UseGuards(AuthGuard('jwt'))
  async findEventByUser(@Param() userId) {
    try {
      const ticketUser = await this._orderService.orderByUser(userId.id);
      return { orders: ticketUser };
    } catch (err) {
      console.log(err);
    }
  }

  @Get('/orderByVendor/:id')
  @UseGuards(AuthGuard('jwt'))
  async findOrderByVendor(@Param() vendorId) {
    try {
      const totalOrder = await this._orderService.orderByVendor(vendorId.id);
      return { orders: totalOrder };
    } catch (err) {
      console.log(err);
    }
  }
}
