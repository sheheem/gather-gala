import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VendorRepository } from './vendor.repository';
import { VendorService } from './vendor.service';
import { UpdateEventDto } from 'src/dto/updateEventDTO/updateEvent.dto';

@Controller('vendor')
export class VendorController {
  constructor(
    private vendorRepository: VendorRepository,
    private _vendorService: VendorService,
  ) {}

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  async vendorProfile(@Req() req) {
    const vendorDetails = await this.vendorRepository.vfindOne(req.user.email);
    return { profile: vendorDetails };
  }

  @Get('/eventsManage/:id')
  @UseGuards(AuthGuard('jwt'))
  async findEvents(@Param() p) {
    const vendorId = p.id;
    const eventList = await this._vendorService.findEventsByVendor(vendorId);
    return { events: eventList };
  }

  @Get('event/edit/:id')
  @UseGuards(AuthGuard('jwt'))
  async eventDetail(@Param() p) {
    const eventId = p.id;
    const eventDetail = await this._vendorService.findEventDetail(eventId);
    return { eventDetail: eventDetail };
  }

  @Post('event_update/:id')
  @UseGuards(AuthGuard('jwt'))
  async eventUpdate(
    @Param() p: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const updateEvent = await this._vendorService.updateEvent(
      p,
      updateEventDto,
    );
    return updateEvent;
  }
}
