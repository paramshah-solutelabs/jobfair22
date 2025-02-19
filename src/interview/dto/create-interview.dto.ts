import {
  IsString,
  IsDateString,
  IsEnum,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { MeetingType } from './meetingType.enum';
import { MeetingStatus } from './meetingStatus.enum';

export class CreateInterviewDto {
  @IsOptional()
  @IsUUID()
  interviewId: string;

  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  scheduled_start_time: string;

  @IsString()
  @IsNotEmpty()
  scheduled_end_time: string;

  @IsEnum(MeetingType)
  @IsNotEmpty()
  type: MeetingType;

  @IsEnum(MeetingStatus)
  @IsNotEmpty()
  status: MeetingStatus;

  @IsNotEmpty()
  @IsString()
  applicationId: string;

  @IsNumber()
  @IsNotEmpty()
  round: number;

  @IsString()
  @IsNotEmpty()
  meeting_link: string;

  @IsString()
  @IsNotEmpty()
  notes: string;
}
