import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { InterviewModule } from 'src/interview/interview.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { JobapplicationModule } from 'src/jobapplication/jobapplication.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    InterviewModule,
    EmployeeModule,
    JobapplicationModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
