import { Candidate } from 'src/candidate/candidate.entity';
import { Employee } from 'src/employee/employee.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne , JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Tokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  // @ManyToOne(() => Candidate, (candidate) => candidate.tokens,{eager:true})
  // @JoinColumn({ name: 'candidateId' }) 
  // candidate: Candidate;
  @OneToOne(() => Candidate, (candidate) => candidate.token, { eager: true , nullable:true}) 
  @JoinColumn({ name: 'candidateId' }) 
  candidate: Candidate | null;

  @OneToOne(() => Employee, (employee) => employee.token, { eager: true , nullable:true}) 
  @JoinColumn({ name: 'employeeId' }) 
  employee: Employee | null;

  

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  expiryDate: Date;
}
