import { Module } from '@nestjs/common';
import { PositionController } from './position.controller';
import { PositionService } from './position.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Position } from './position.entity';
import { DepartmentModule } from 'src/department/department.module';
import { EmployeeModule } from 'src/employee/employee.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Position]),
    DepartmentModule,
    EmployeeModule,
  ],
  controllers: [PositionController],
  providers: [PositionService],
  exports: [PositionService],
})
export class PositionModule {}
