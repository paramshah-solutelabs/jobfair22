import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { LoginEmployeeDto } from './dto/login-employee.dto';
import { DepartmentService } from 'src/department/department.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,

    private departmentService: DepartmentService,

    private readonly jwtService: JwtService,
  ) {}

  async signUp(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { department_id, email, phone, password, ...employeeData } =
      createEmployeeDto;

    const existingEmail = await this.employeeRepository.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new HttpException(
        'Email already exists, cannot create employee',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingPhone = await this.employeeRepository.findOne({
      where: { phone },
    });
    if (existingPhone) {
      throw new HttpException(
        'Phone number already exists, cannot create employee',
        HttpStatus.BAD_REQUEST,
      );
    }

    const department = await this.departmentService.findById(department_id);
    if (!department) {
      throw new Error('Department not found');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = this.employeeRepository.create({
      ...employeeData,
      email,
      phone,
      password: hashedPassword,
      department,
    });

    return await this.employeeRepository.save(employee);
  }

  async login(
    loginEmployeeDto: LoginEmployeeDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = loginEmployeeDto;

    const employee = await this.employeeRepository.findOne({
      where: { email },
    });

    if (!employee) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      email: employee.email,
      role: employee.role,
      id: employee.id,
    };

    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async getEmployeeById(id: string): Promise<Employee> {
    const foundEmployee = await this.employeeRepository.findOneBy({ id });
    if (!foundEmployee) {
      throw new NotFoundException('Employee does not exist');
    }
    return foundEmployee;
  }
}
