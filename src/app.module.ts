import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidateModule } from './candidate/candidate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentModule } from './department/department.module';
import { EmployeeModule } from './employee/employee.module';
import { PositionModule } from './position/position.module';
import { InterviewModule } from './interview/interview.module';
import { ReviewModule } from './review/review.module';
import { JobapplicationModule } from './jobapplication/jobapplication.module';
import { ConfigModule } from '@nestjs/config';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '../.env', isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgrace',
      database: 'jobfair2',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CandidateModule,
    DepartmentModule,
    EmployeeModule,
    PositionModule,
    InterviewModule,
    ReviewModule,
    JobapplicationModule,
    TokensModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
