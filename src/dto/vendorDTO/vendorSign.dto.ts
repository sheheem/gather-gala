import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class VendorSignDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: number;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
