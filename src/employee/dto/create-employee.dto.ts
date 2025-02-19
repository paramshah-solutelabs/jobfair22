import {
  IsBoolean,
  IsEmail,
  isEnum,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EmployeeStatus } from '../dto/employment-status.enum';
import { EmployeeType } from './employee-type.enum';

export class CreateEmployeeDto {
  @IsNotEmpty({ message: 'First name is required' })
  @IsString({ message: 'First name must be a string' })
  first_name: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @IsString({ message: 'Last name must be a string' })
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(EmployeeType)
  type: EmployeeType;

  @IsNotEmpty()
  @IsUUID()
  department_id: string;

  // @IsNotEmpty()
  // @IsBoolean()
  // isRecruiter:boolean

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^[1-9]{1}[0-9]{9}$/, {
    message: 'Phone number must be 10 digits and not start with 0',
  })
  phone: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsString({ message: 'Role must be a string' })
  role: string;

  // @IsOptional()
  // isHiringManager: boolean;

  // @IsOptional()
  // isInterviewer: boolean;

  @IsNotEmpty({ message: 'Hire date is required' })
  hire_date: string;

  @IsEnum(EmployeeStatus, {
    message: 'Employment status must be one of: Fulltime,Parttime,Contract',
  })
  employment_status: EmployeeStatus;

  @IsBoolean({ message: 'is_Active must be a boolean' })
  is_Active: boolean;
}
