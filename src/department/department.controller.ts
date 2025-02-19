import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { createDepartmentDto } from './dto/create-department.dto';
import { Department } from './department.entity';

@Controller('departments')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post()
  async create(
    @Body() createDepartmentDto: createDepartmentDto,
  ): Promise<Department> {
    return this.departmentService.create(createDepartmentDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Department> {
    return this.departmentService.findById(id);
  }
}
