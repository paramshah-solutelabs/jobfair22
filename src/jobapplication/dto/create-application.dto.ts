import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ApplicationStatus } from './job-application.status.enum';

export class CreateJobApplicationDto {
  @IsEmail()
  email: string;

  @IsUrl()
  resume_url: string;

  @IsEnum(ApplicationStatus)
  @IsOptional()
  status?: ApplicationStatus = ApplicationStatus.NEW;

  // @IsString()
  // position_id: string;

  @IsUrl()
  @IsOptional()
  cover_letter_url?: string;

  @IsInt()
  @IsOptional()
  expected_salary?: number;

  @IsString()
  @IsOptional()
  referral_source?: string;

  @IsNotEmpty()
  positionId: string;
}
