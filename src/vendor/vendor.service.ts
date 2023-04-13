import { Injectable } from '@nestjs/common';
import { EventRepositoray } from 'src/event/event.repository';

@Injectable()
export class VendorService {
  constructor(private _eventRepository: EventRepositoray) {}

  async findEventsByVendor(id) {
    const events = await this._eventRepository.find({ organizerId: id });
    return events;
  }

  async findEventDetail(id) {
    const eventDetail = await this._eventRepository.findById(id);
    return eventDetail;
  }

  async updateEvent(id, updateEventDto) {
    const updateEvent = await this._eventRepository.updateOne(
      {
        _id: id.id,
      },
      {
        $set: updateEventDto,
      },
    );
    return updateEvent;
  }
}
