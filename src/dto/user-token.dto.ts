import { IsNotEmpty } from 'class-validator';

export class UserTokenDto {
  @IsNotEmpty()
  email: string;
}
