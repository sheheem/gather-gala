import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { EventController } from './event.controller';
import { EventRepositoray } from './event.repository';
import { Event, eventSchema } from './event.schema';
import { EventService } from './event.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: eventSchema }]),
    forwardRef(() => AuthModule),
  ],
  controllers: [EventController],
  providers: [EventService, EventRepositoray],
})
export class EventModule {}
