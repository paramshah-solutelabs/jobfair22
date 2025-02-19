import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Candidate } from './candidate.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Candidate)
    private employeeRepository: Repository<Candidate>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'topSecret51',
    });
  }

  async validate(payload: Candidate): Promise<Candidate> {
    const { email } = payload;
    const employee = await this.employeeRepository.findOne({
      where: { email },
    });
    if (!employee) {
      throw new UnauthorizedException('Invalid token');
    }
    return employee;
  }
}
