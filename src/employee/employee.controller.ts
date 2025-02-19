import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { IsRecruiter } from './guards/isRecruiter.guard';
import { AuthGuard } from '@nestjs/passport';
import { isUser } from './guards/isUser.guard';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @UseGuards(AuthGuard(), isUser)
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.signUp(createEmployeeDto);
  }

  @Post('login')
  async login(@Body() loginEmployeeDto: LoginEmployeeDto) {
    return await this.employeeService.login(loginEmployeeDto);
  }

  @Get(':id')
  async getEmployeeById(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.getEmployeeById(id);
  }
}
