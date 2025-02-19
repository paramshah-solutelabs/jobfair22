import { Module } from '@nestjs/common';
import { JobapplicationController } from './jobapplication.controller';
import { JobapplicationService } from './jobapplication.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './jobapplication.entity';
import { CandidateModule } from 'src/candidate/candidate.module';
import { PositionModule } from 'src/position/position.module';
import { EmployeeModule } from 'src/employee/employee.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './functions/sendMail';

@Module({
  imports: [
    TypeOrmModule.forFeature([JobApplication]),
    CandidateModule,
    PositionModule,
    EmployeeModule,
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
  controllers: [JobapplicationController],
  providers: [JobapplicationService, MailService],
  exports: [JobapplicationService],
})
export class JobapplicationModule {}
