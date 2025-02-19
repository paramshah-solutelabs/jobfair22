import {
  IsString,
  IsDateString,
  IsOptional,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class GetInterviewDetailsDto {
  @IsEmail()
  email: string;

  @IsString()
  first_name: string;

  @IsString()
  resume_url: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  scheduled_start_time?: string;

  @IsString()
  meeting_link?: string;

  @IsNumber()
  round: number;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsString()
  position: string;

  @IsString()
  @IsEmail()
  employee_email: string;

  @IsString()
  employee_first_name: string;

  @IsString()
  employee_last_name: string;
}
