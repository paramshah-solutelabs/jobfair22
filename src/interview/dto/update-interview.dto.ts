import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { MeetingType } from './meetingType.enum';
import { MeetingStatus } from './meetingStatus.enum';

export class updateInterviewDto {
  @IsOptional()
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  scheduled_start_time: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  scheduled_end_time: string;

  @IsOptional()
  @IsEnum(MeetingType)
  @IsNotEmpty()
  type: MeetingType;

  @IsOptional()
  @IsEnum(MeetingStatus)
  @IsNotEmpty()
  status: MeetingStatus;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  round: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  notes: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  meeting_link: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  employeeId: string;
}
