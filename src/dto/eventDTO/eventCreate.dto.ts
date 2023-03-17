import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsUrl,
} from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  eventName: string;

  @IsNotEmpty()
  eventType: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsNotEmpty()
  eventDescription: string;

  @IsNotEmpty()
  ticketType: string;

  @IsNotEmpty()
  @IsNumber()
  ticketNumber: number;

  @IsNotEmpty()
  @IsNumber()
  ticketPrice: number;

  @IsNotEmpty()
  ticketDescription: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;
}
