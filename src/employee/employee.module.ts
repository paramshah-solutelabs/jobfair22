import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { DepartmentModule } from 'src/department/department.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { isHiringManager } from './guards/isHiringManager.guard';
import { JwtStrategy } from './jwt.strategy';
import { CandidateModule } from 'src/candidate/candidate.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    TypeOrmModule.forFeature([Employee]),
    DepartmentModule,
    CandidateModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, isHiringManager, JwtStrategy],
  exports: [JwtStrategy, PassportModule, EmployeeService],
})
export class EmployeeModule {}
