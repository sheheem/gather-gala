import { Injectable } from '@nestjs/common';
import { CreatedModel } from 'nestjs-mongoose-generic-repository';
import { CreateEventDto } from 'src/dto/eventDTO/eventCreate.dto';
import { EventRepositoray } from './event.repository';

@Injectable()
export class EventService {
  constructor(private _eventRepository: EventRepositoray) {}

  async createEvent(model: CreateEventDto): Promise<CreatedModel> {
    const createdEvent = await this._eventRepository.create(model);
    return createdEvent;
  }
}
