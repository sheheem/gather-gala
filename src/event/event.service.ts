import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatedModel } from 'nestjs-mongoose-generic-repository';
import { CreateEventDto } from 'src/dto/eventDTO/eventCreate.dto';
import { EventRepositoray } from './event.repository';

@Injectable()
export class EventService {
  constructor(private _eventRepository: EventRepositoray) {}

  async createEvent(model: CreateEventDto): Promise<CreatedModel> {
    const createdEvent = await this._eventRepository.create(model);
    console.log(createdEvent);
    return createdEvent;
  }

  async findAllEvents() {
    try {
      const allEvents = await this._eventRepository.findAll();
      return allEvents;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  async findEventDetail(eventId) {
    try {
      const eventDetail = await (
        await this._eventRepository.findById(eventId)
      ).populate('organizerId');
      return eventDetail;
    } catch (err) {
      throw new BadRequestException();
    }
  }
}
