import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  eventName: string;

  @IsNotEmpty()
  eventType: string;

  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  eventDescription: string;

  @IsNotEmpty()
  @IsNumber()
  ticketCount: number;

  @IsNotEmpty()
  @IsNumber()
  ticketPrice: number;

  @IsNotEmpty()
  tickerDescription: string;

  @IsNotEmpty()
  imageUrl: string;

  @IsNotEmpty()
  venue: string;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  langitude: number;
}
