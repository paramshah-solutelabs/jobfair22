import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { GetInterviewDetailsDto } from '../dto/sendEmail.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMailToCandidate(details: GetInterviewDetailsDto) {
    const subject = `Interview schedule for ${details.position}`;

    const text = `
    Hey ${details.first_name},

    We are happy to inform you that your application has been selected for the ${details.position} role.

    Your interview is scheduled for ${details.date} at ${details.scheduled_start_time}.

    Interviewer: ${details.employee_first_name} ${details.employee_last_name}

    Meeting Link: ${details.meeting_link}
    Interview Type: ${details.type}
    Interview Roud:${details.round};

    Notes: ${details.notes ? details.notes : 'No additional notes'}

    Best regards,
    Your Recruitment Team
    `;

    await this.mailService.sendMail({
      from: 'param.s1@gmail.com',
      to: details.email,
      subject: subject,
      text: text,
    });
  }

  async sendEmailToInterviewer(details) {
    const subject = `Interview schedule for ${details.position}`;

    const text = `
    Hey ${details.employee_first_name},

    You have interviewe with ${details.first_name},

    Resume url:${details.resume_url}

    Meeting link:${details.meeting_link}
    `;

    await this.mailService.sendMail({
      from: 'param.s1@gmail.com',
      to: details.employee_email,
      subject: subject,
      text: text,
    });
  }
}
