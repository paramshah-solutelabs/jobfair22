import { Module } from '@nestjs/common';
import { InterviewController } from './interview.controller';
import { InterviewService } from './interview.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interview } from './interview.entity';
import { CandidateModule } from 'src/candidate/candidate.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { PositionModule } from 'src/position/position.module';
import { JobapplicationModule } from 'src/jobapplication/jobapplication.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { InterviewQueryService } from './functions/emailQuery';
import { MailService } from './functions/interviewEmail';
import { InterviewAvailability } from './functions/interviewAvaibility';

@Module({
  imports: [
    TypeOrmModule.forFeature([Interview]),
    CandidateModule,
    EmployeeModule,
    PositionModule,
    JobapplicationModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      },
    }),
  ],
  controllers: [InterviewController],
  providers: [
    InterviewService,
    InterviewQueryService,
    MailService,
    InterviewAvailability,
  ],
  exports: [InterviewService],
})
export class InterviewModule {}
