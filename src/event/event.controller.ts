import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateEventDto } from 'src/dto/eventDTO/eventCreate.dto';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private _eventService: EventService) {}

  @Post('/add-event')
  addEvent(@Body(ValidationPipe) createEvent: CreateEventDto) {
    return this._eventService.createEvent(createEvent);
  }
}
