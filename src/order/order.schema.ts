import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Event } from 'src/event/event.schema';
import { Vendor } from 'src/vendor/vendor.schema';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  eventId: Event;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' })
  organizerId: Vendor;

  @Prop({ required: true })
  ticketPrice: number;

  @Prop({ required: true })
  quantity: number;
}

export const orderSchema = SchemaFactory.createForClass(Order);
