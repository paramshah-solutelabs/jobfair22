import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt.payload';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CandidateService } from 'src/candidate/candidate.service';
import { Candidate } from 'src/candidate/candidate.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private candidateService: CandidateService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: JwtPayload): Promise<Employee | Candidate> {
    const { id } = payload;
    const employee = await this.employeeRepository.findOne({ where: { id } });
    if (employee) {
      return employee;
    }
    const candidate = await this.candidateService.getCandidateById(id);
    if (candidate) {
      return candidate;
    }
    throw new UnauthorizedException('Invalid token');
  }
}
