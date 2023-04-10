import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { Order, orderSchema } from './order.schema';
import { OrderService } from './order.service';
import { StripeModule } from 'nestjs-stripe';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: orderSchema }]),
    forwardRef(() => AuthModule),
    StripeModule.forRoot({
      apiKey: process.env.STRIPESECRETID,
      apiVersion: '2022-11-15',
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        secure: false,
        auth: {
          user: 'apikey',
          pass: process.env.SMTPPASS,
        },
      },
      defaults: {
        from: 'sheheemzainudeen@gmail.com',
      },
      // template: {
      //   dir: join(__dirname, "/template"),
      //   adapter: new HandlebarsAdapter(),
      //   options: {
      //     static: true,
      //   },
      // },
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [],
})
export class OrderModule {}
