import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Vendor } from 'src/vendor/vendor.schema';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true })
  organizerId: Vendor;

  @Prop({ required: true })
  eventName: string;

  @Prop({ required: true })
  eventType: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  eventDescription: string;

  @Prop({
    required: true,
    type: [
      {
        ticketType: { type: String, required: true },
        ticketNumber: { type: Number, required: true },
        ticketPrice: { type: Number, required: true },
        ticketDescription: { type: String, required: true },
      },
    ],
  })
  tickets: {
    ticketType: string;
    ticketNumber: number;
    ticketPrice: number;
    ticketDescription: string;
  };

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  longitude: number;

  @Prop({ required: true })
  latitude: number;
}

export const eventSchema = SchemaFactory.createForClass(Event);
