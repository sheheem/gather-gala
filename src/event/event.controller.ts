import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEventDto } from 'src/dto/eventDTO/eventCreate.dto';
import { AuthGuard } from '@nestjs/passport';
import { EventService } from './event.service';
import { Param, Req } from '@nestjs/common/decorators';

@Controller('event')
export class EventController {
  constructor(private _eventService: EventService) {}

  @Post('/add_event')
  @UseGuards(AuthGuard('jwt'))
  addEvent(@Body(ValidationPipe) createEvent: CreateEventDto) {
    console.log(createEvent);
    return this._eventService.createEvent(createEvent);
  }

  @Get('/all_event')
  async findAllEvent(@Req() req) {
    const events = await this._eventService.findAllEvents();
    console.log(events);
    return { event: events };
  }

  @Get('/event-detail/:id')
  async findEventById(@Param() p) {
    const eventId = p.id;
    console.log(eventId);
    const eventDetail = await this._eventService.findEventDetail(eventId);
    return { eventDetail: eventDetail };
  }
}
