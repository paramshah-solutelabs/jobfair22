import { IsString, IsNotEmpty } from 'class-validator';

export class LoginEmployeeDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
