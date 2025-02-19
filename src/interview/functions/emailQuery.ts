import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GetInterviewDetailsDto } from '../dto/sendEmail.dto';

@Injectable()
export class InterviewQueryService {
  constructor(private readonly dataSource: DataSource) {}

  async getInterviewDetails(
    interviewId: string,
  ): Promise<GetInterviewDetailsDto> {
    const result = await this.dataSource.query(
      `SELECT candidate.email, 
        candidate.first_name,
        candidate.resume_url,
        interview.date, 
        interview.scheduled_start_time, 
        interview.meeting_link, 
        interview.type, 
        interview.notes,
        interview.round,
        position.title AS position, 
        employee.email AS employee_email,
        employee.first_name AS employee_first_name, 
        employee.last_name AS employee_last_name
       FROM "interview"
       JOIN "employee" ON "employee"."id" = "interview"."employeeId"
       JOIN "job_application" ON "interview"."applicationId" = "job_application"."id"
       JOIN "position" ON "position"."id" = "job_application"."positionId"
       JOIN "candidate" ON "candidate"."id" = "job_application"."candidateId"
       WHERE "interview"."id" = $1`,
      [interviewId],
    );
    return result;
  }
}
