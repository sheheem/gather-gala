import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Repository } from 'nestjs-mongoose-generic-repository';
import { EventDocument } from './event.schema';

@Injectable()
export class EventRepositoray extends Repository<EventDocument> {
  constructor(@InjectModel(Event.name) private entity: Model<EventDocument>) {
    super(entity);
  }
}
