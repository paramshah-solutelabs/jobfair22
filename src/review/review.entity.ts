import { Employee } from 'src/employee/employee.entity';
import { Interview } from 'src/interview/interview.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { reviewStatus } from './dto/review-status.enum';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Interview, (int) => int.reviews, { eager: true })
  interview: Interview;

  @ManyToOne(() => Employee, { eager: false })
  employee: Employee;

  @Column()
  review_text: string;

  @Column()
  is_Recommended: boolean;

  @Column()
  technical_score: number;

  @Column()
  communication_score: number;

  @Column({ type: 'date' })
  review_date: string;

  @Column({ type: 'enum', enum: reviewStatus })
  status: reviewStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
