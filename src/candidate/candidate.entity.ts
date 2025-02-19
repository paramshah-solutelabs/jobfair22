import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Status } from './dto/candidate-status.enum';
import { Tokens } from 'src/tokens/tokens.entity';
import { JobApplication } from 'src/jobapplication/jobapplication.entity';

@Entity()
export class Candidate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, default: null })
  first_name: string;

  @Column({ nullable: true, default: null })
  last_name: string;

  @Column({ nullable: true, default: null })
  password: string;

  @Column({ nullable: true, default: null })
  phone: string;

  @Column({ nullable: true, default: null })
  resume_url: string;

  @Column({ nullable: true, default: null })
  linkedIn_url: string;

  @Column({ nullable: true, default: null })
  current_company: string;

  @Column({ nullable: true, default: null })
  current_position: string;

  @Column({ nullable: true, default: null })
  source: string;

  @Column({ nullable: true, default: null })
  rejection_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: Status,
    nullable: true,
    default: Status.Inactive,
  })
  status: Status;

  @Column({ nullable: true, default: null })
  notes: string;

  // @OneToMany(() => Tokens, (token) => token.candidate)
  // tokens: Tokens[];
  @OneToOne(() => Tokens, (token) => token.candidate) 
token: Tokens;


}
