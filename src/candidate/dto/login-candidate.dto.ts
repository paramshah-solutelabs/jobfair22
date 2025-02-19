import { IsNotEmpty } from 'class-validator';

export class LoginUser {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
