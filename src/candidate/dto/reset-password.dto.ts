import { IsNotEmpty } from 'class-validator';

export class ResetPassword {
 @IsNotEmpty()
  password: string;
}
