import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { MeetingType } from './dto/meetingType.enum';
import { MeetingStatus } from './dto/meetingStatus.enum';
import { Employee } from 'src/employee/employee.entity';
import { Review } from 'src/review/review.entity';
import { JobApplication } from 'src/jobapplication/jobapplication.entity';
import { JoinColumn } from 'typeorm';

@Entity()
export class Interview {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne(() => Candidate, (candidate) => candidate.interviews, {
  //   eager: true,
  // })
  // candidate: Candidate;

  @OneToMany(() => Review, (rev) => rev.interview, { eager: false })
  reviews: Review[];

  @OneToOne(() => JobApplication, (application) => application.interview, {
    eager: true,
  })
  @JoinColumn()
  application: JobApplication;

  @ManyToOne(() => Employee, (employee) => employee.interviews, { eager: true })
  employee: Employee;

  // @ManyToOne(() => Position, (position) => position.interviews, { eager: true })
  // position: Position;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'time' })
  scheduled_start_time: string;

  @Column({ type: 'time' })
  scheduled_end_time: string;

  @Column({ type: 'enum', enum: MeetingType })
  type: MeetingType;

  @Column({ type: 'enum', enum: MeetingStatus })
  status: MeetingStatus;

  @Column()
  round: number;

  @Column()
  meeting_link: string;

  @Column()
  notes: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
