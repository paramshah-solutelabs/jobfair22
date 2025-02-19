import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApplicationStatus } from './dto/job-application.status.enum';
import { Position } from 'src/position/position.entity';
import { Employee } from 'src/employee/employee.entity';
import { Interview } from 'src/interview/interview.entity';
import { Candidate } from 'src/candidate/candidate.entity';

@Entity()
export class JobApplication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  application_date: string;

  @Column({
    type: 'enum',
    enum: ApplicationStatus,
    default: ApplicationStatus.NEW,
  })
  status: ApplicationStatus;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  resume_url: string;

  @ManyToOne(() => Position, (position) => position.jobapplications, {
    eager: true,
  })
  position: Position;

  @OneToOne(() => Interview, (interview) => interview.application, {
    nullable: true,
  })
  interview: Interview;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cover_letter_url: string;

  @Column({ type: 'boolean', default: false })
  has_reviewed: boolean;

  @Column({ type: 'int', nullable: true })
  expected_salary: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  referral_source: string;

  @JoinColumn({ name: 'reviewer_employee' })
  @ManyToOne(() => Employee, { eager: false, nullable: true })
  reviewer_employee: Employee;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'text', nullable: true })
  internal_notes: string;

}
