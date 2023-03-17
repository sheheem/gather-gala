import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEventDto } from 'src/dto/eventDTO/eventCreate.dto';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private _eventService: EventService) {}

  @Post('/add_event')
  @UseGuards(AuthGuard('jwt'))
  addEvent(@Body(ValidationPipe) createEvent: CreateEventDto) {
    return this._eventService.createEvent(createEvent);
  }
}
