import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class VendorLogDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
