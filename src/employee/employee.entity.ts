import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { EmployeeStatus } from './dto/employment-status.enum';
import { Department } from 'src/department/department.entity';
import { Interview } from 'src/interview/interview.entity';
import { OneToMany } from 'typeorm';
import { Review } from 'src/review/review.entity';
import { EmployeeType } from './dto/employee-type.enum';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Department, (dep) => dep.employees, { eager: true })
  department: Department;

  @Column()
  first_name: string;

  @OneToMany(() => Review, (rev) => rev.employee, { eager: false })
  reviews: Review[];

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @Column({ type: 'enum', enum: EmployeeType })
  type: EmployeeType;

  @Column({ type: 'date' })
  hire_date: string;

  @Column({ type: 'enum', enum: EmployeeStatus })
  employment_status: EmployeeStatus;

  @Column()
  password: string;

  @CreateDateColumn()
  created_At: Date;

  @UpdateDateColumn()
  updated_At: Date;

  @Column()
  is_Active: boolean;

  @OneToMany(() => Interview, (interview) => interview.employee, {
    eager: false,
  })
  interviews: Interview[];
}
