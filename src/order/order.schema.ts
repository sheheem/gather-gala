import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Event } from 'src/event/event.schema';
import { User } from 'src/user/user.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  eventId: Event;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  ticketId: Event;

  @Prop({ required: true })
  eventName: string;

  @Prop({ required: true })
  ticketType: string;

  @Prop({ required: true })
  ticketPrice: string;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  totalTickets: number;
}

export const orderSchema = SchemaFactory.createForClass(Order);
