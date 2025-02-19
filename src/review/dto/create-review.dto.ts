import {
  IsString,
  IsBoolean,
  IsNumber,
  IsEnum,
  IsDateString,
} from 'class-validator';
import { reviewStatus } from './review-status.enum';

export class CreateReviewDto {
  @IsString()
  interviewId: string;

  @IsString()
  employeeId: string;

  @IsString()
  review_text: string;

  @IsBoolean()
  is_Recommended: boolean;

  @IsNumber()
  technical_score: number;

  @IsNumber()
  communication_score: number;

  @IsDateString()
  review_date: string;

  @IsEnum(reviewStatus)
  status: reviewStatus;
}
