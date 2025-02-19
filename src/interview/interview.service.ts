import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Interview } from './interview.entity';
import { CreateInterviewDto } from './dto/create-interview.dto';
import { EmployeeService } from 'src/employee/employee.service';
import { JobapplicationService } from 'src/jobapplication/jobapplication.service';
import { ApplicationStatus } from 'src/jobapplication/dto/job-application.status.enum';
import { InterviewQueryService } from './functions/emailQuery';
import { MailService } from './functions/interviewEmail';
import { MeetingStatus } from './dto/meetingStatus.enum';
import { InterviewAvailability } from './functions/interviewAvaibility';
import { updateInterviewDto } from './dto/update-interview.dto';

@Injectable()
export class InterviewService {
  constructor(
    @InjectRepository(Interview)
    private readonly interviewRepository: Repository<Interview>,
    private readonly employeeService: EmployeeService,
    private readonly jobapplicationService: JobapplicationService,
    private readonly interviewQueries: InterviewQueryService,
    private mailService: MailService,
    private interviewAvaibility: InterviewAvailability,
  ) {}

  async createInterview(
    createInterviewDto: CreateInterviewDto,
  ): Promise<Interview> {
    const { applicationId, employeeId, interviewId, ...interviewData } =
      createInterviewDto;
    await this.interviewAvaibility.checkAvailability(
      employeeId,
      createInterviewDto.date,
      createInterviewDto.scheduled_start_time,
    );
    const application =
      await this.jobapplicationService.getApplicationById(applicationId);
    const employee = await this.employeeService.getEmployeeById(employeeId);

    if (!application || !employee) {
      throw new Error('One or more related entities not found');
    }

    let savedInterview: Interview;
    if (interviewId) {
      const foundInterview = await this.interviewRepository.findOne({
        where: { id: interviewId },
      });

      if (!foundInterview) {
        throw new Error(`Interview with ID ${interviewId} not found`);
      }

      if (employeeId && employeeId !== foundInterview.employee.id) {
        const newEmployee =
          await this.employeeService.getEmployeeById(employeeId);
        if (!newEmployee) throw new Error('New employee not found');
        foundInterview.employee = newEmployee;
      }

      Object.assign(foundInterview, interviewData);
      savedInterview = await this.interviewRepository.save(foundInterview);
    } else {
      const interview = this.interviewRepository.create({
        ...interviewData,
        application,
        employee,
      });

      interview.application.status = ApplicationStatus.INTERVIEW;
      await this.jobapplicationService.save(interview.application);

      savedInterview = await this.interviewRepository.save(interview);
    }

    const interviewDetails = await this.interviewQueries.getInterviewDetails(
      savedInterview.id,
    );

    await this.mailService.sendMailToCandidate(interviewDetails[0]);
    await this.mailService.sendEmailToInterviewer(interviewDetails[0]);

    return savedInterview;
  }

  async changeInterviewStatus(id: string) {
    const interview = await this.interviewRepository.findOne({ where: { id } });
    if (!interview) {
      throw new NotFoundException('Interview not found');
    }
    interview.status = MeetingStatus.COMPLETED;
    await this.interviewRepository.save(interview);
  }

  async getInterviewById(id: string): Promise<Interview> {
    const foundInterview = await this.interviewRepository.findOne({
      where: { id },
    });
    if (!foundInterview) {
      throw new NotFoundException('Interview not found');
    }
    return foundInterview;
  }

  async updateInterview(
    id: string,
    updateInterview: updateInterviewDto,
  ): Promise<Interview> {
    const foundInterview = await this.interviewRepository.findOne({
      where: { id },
    });

    if (!foundInterview) {
      throw new BadRequestException('Interview not found');
    }
    const updatedArray = Object.assign(foundInterview, updateInterview);
    const updatedInterview = await this.interviewRepository.save(updatedArray);
    return updatedInterview;
  }

  async deleteInterview(id: string): Promise<{ status: boolean }> {
    const result = await this.interviewRepository.delete(id);

    if (result.affected === 0) {
      throw new BadRequestException(`Interview does not exist`);
    }

    return { status: true };
  }
}
