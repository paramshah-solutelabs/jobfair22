import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Employee } from 'src/employee/employee.entity';
import { Position } from 'src/position/position.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Employee, (emp) => emp.department, { eager: false })
  employees: Employee[];

  @OneToMany(() => Position, (pos) => pos.department, { eager: false })
  positions: Position[];
}
