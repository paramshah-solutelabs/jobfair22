import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class createDepartmentDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  description: string;
}
