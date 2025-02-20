import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { IsRecruiter } from './guards/isRecruiter.guard';
import { AuthGuard } from '@nestjs/passport';
import { isUser } from './guards/isUser.guard';
import { Req } from '@nestjs/common';
import { InviteEmployeeDto } from './dto/invite-employee.dto';


@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  // @UseGuards(AuthGuard(), isUser)
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.signUp(createEmployeeDto);
  }

  @Post("employeeInfo")
  async setEmployeeInfo(@Body("password") password:string,@Req() request){
    const token=request.headers['authorization'];

    await this.employeeService.setEmployeeInfo(token,password)
  }

  @Post("invite")
  async inviteEmployee(@Body() inviteEmployee:InviteEmployeeDto){

    await this.employeeService.inviteEmployee(inviteEmployee)
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
