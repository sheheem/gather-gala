import { IsDateString, IsUrl } from 'class-validator';

export class UpdateEventDto {
  eventName: string;
  eventType: string;
  eventDescription: string;
  ticket: TicketDto[];
  location: string;

  @IsUrl()
  imageUrl: string;
  longitude: string;
  latitude: string;

  @IsDateString()
  startDate: Date;
  @IsDateString()
  endDate: Date;
}

class TicketDto {
  ticketType: string;
  ticketDescription: string;
  ticketNumber: number;
  ticketPrice: number;
}
