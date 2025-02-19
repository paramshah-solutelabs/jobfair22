import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import { PositionStatus } from './position-status.enum';

export class CreatePositionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  requirements: string;

  @IsNotEmpty()
  @IsString()
  position_type: string;

  @IsNotEmpty()
  @IsString()
  experience_level: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  salary_min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  salary_max: number;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  status: PositionStatus;

  @IsNotEmpty()
  posted_date: Date;

  @IsNotEmpty()
  closing_date: Date;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  openings: number;

  @IsNotEmpty()
  @IsBoolean()
  is_remote: boolean;

  @IsNotEmpty()
  @IsString()
  departmentId: string;
}
