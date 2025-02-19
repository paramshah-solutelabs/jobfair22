import { Department } from 'src/department/department.entity';
import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import { Interview } from 'src/interview/interview.entity';
import { JobApplication } from 'src/jobapplication/jobapplication.entity';
import { PositionStatus } from './dto/position-status.enum';

@Entity()
export class Position {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Department, (dept) => dept.positions, { eager: true })
  department: Department;

  @OneToMany(
    () => JobApplication,
    (jobapplication) => jobapplication.position,
    { eager: false },
  )
  jobapplications: JobApplication[];

  @Column()
  description: string;

  @Column()
  requirements: string;

  @Column()
  position_type: string;

  @Column()
  experience_level: string;

  @Column()
  salary_min: number;

  @Column()
  salary_max: number;

  @Column()
  location: string;

  @Column()
  status: PositionStatus;

  @Column({ type: 'date' })
  posted_date: Date;

  @Column({ type: 'date' })
  closing_date: Date;

  @Column()
  openings: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  is_remote: boolean;
}
