import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  eventId: string;

  @IsNotEmpty()
  eventName: string;

  @IsNotEmpty()
  ticketType: string;

  @IsNotEmpty()
  ticketId: string;

  @IsNotEmpty()
  ticketPrice: number;

  @IsNotEmpty()
  @IsNumber()
  totalTickets: number;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}
