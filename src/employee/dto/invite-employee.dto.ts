import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EmployeeType } from './employee-type.enum';

export class InviteEmployeeDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsString()
  role: EmployeeType;
}
