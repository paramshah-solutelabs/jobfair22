import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interview } from '../interview.entity';

@Injectable()
export class InterviewAvailability {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepo: Repository<Interview>,
  ) {}

  async checkAvailability(
    employeeId: string,
    date: string,
    scheduled_start_time: string,
  ): Promise<boolean> {
    const existingInterview = await this.interviewRepo.findOne({
      where: {
        employee: { id: employeeId },
        scheduled_start_time,
        date: date,
      },
    });
    if (existingInterview) {
      throw new BadRequestException(
        'Interviewer is not available at the given time',
      );
    }
    return true;
  }
}
