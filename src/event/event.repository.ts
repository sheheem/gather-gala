import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from 'nestjs-mongoose-generic-repository';
import { EventDocument } from './event.schema';

@Injectable()
export class EventRepositoray extends Repository<EventDocument> {
  constructor(@InjectModel(Event.name) private entity: Model<EventDocument>) {
    super(entity);
  }

  async deleteEvent(eventId) {
    try {
      const event = await this.entity.deleteOne({ id: eventId });
      console.log(`Event with id ${eventId.id} successfully deleted`);
      return event;
    } catch (err) {
      console.log(err);
      throw new NotFoundException('Event not found');
    }
  }
}
