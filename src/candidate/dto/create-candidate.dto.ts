import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Matches,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from './candidate-status.enum';

export class CreateCandidateDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  first_name: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Matches(/^[1-9]{1}[0-9]{9}$/, {
    message: 'Phone number must be 10 digits and not start with 0',
  })
  phone: string;

  @IsOptional()
  linkedIn_url: string;

  @IsOptional()
  current_company: string;

  @IsOptional()
  current_position: string;

  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  @IsOptional()
  source: string;

  @IsOptional()
  @IsEnum(Status, {
    message:
      'Status must be one of the following values: "active", "inactive", "blocklisted"',
  })
  status: Status;

  @MinLength(10)
  @MaxLength(2000)
  @IsOptional()
  notes: string;
}
