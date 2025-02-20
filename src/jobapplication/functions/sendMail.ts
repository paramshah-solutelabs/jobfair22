import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JobApplication } from '../jobapplication.entity';
import { DataSource } from 'typeorm';
import { ServerClient } from 'postmark';

@Injectable()
export class MailService {
  private client: ServerClient;
  constructor(
    private readonly mailService: MailerService,
    private dataSoruce: DataSource,
  ) {
    this.client = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);
  }

  async isHired(candidateId: string, salary: number, position: string) {
    const query = 'SELECT email FROM candidate WHERE id = $1';
    const result = await this.dataSoruce.query(query, [candidateId]);

    if (result.length > 0) {
      const subject = 'Invitation to our company';
      const email = result[0].email;

      const text = `
        Congratulations! You have been hired by our company. We will be in touch soon.

        We are ready to offer you ${salary} for ${position}.

        If you , agree , you can send confirmation to us through email.

        Thankyou.
      `;

      await this.mailService.sendMail({
        from: 'param.s1@gmail.com',
        to: email,
        subject: subject,
        text: text,
      });
    } else {
      throw new Error('Candidate not found');
    }
  }

  async welcomeCandidate(email: string,token:string) {
    const subject = 'JobFair2 - Application Received & Next Steps';

    const templateModel = {
      email: email, 
      token:token,
      action_url: 'https://jobfair2.com/set-up-account', 
    };
    const templateId = 39079447; 

    const text = `
    Hi ${email},
  
    Thank you for applying through JobFair2! Your application has been successfully submitted to our recruiters. 
  
    Based on your experience and resume, your application status will be updated accordingly. You can track your application status on our website.
  
    To proceed, please set up your password and log in to your account.
  
    If you have any questions, feel free to reach out.
  
    Best regards,  
    JobFair2 Team
    `;
    try {
      await this.client.sendEmailWithTemplate({
        From: 'param.s1@solutelabs.com', 
        To: email, 
        TemplateId: templateId,
        TemplateModel: templateModel, 
      });
    } catch (error) {
      console.error('Error sending email with template:', error);
      throw new Error('Failed to send welcome email with template');
    }

  }
  async postMark(to: string, subject: string, text?: string, html?: string) {
    return this.client.sendEmail({
      From: 'param.s1@solutelabs.com',
      To: to,
      Subject: subject,
      TextBody: text || 'Default text body',
      HtmlBody: html || `<p>${text || 'Default HTML body'}</p>`,
    });
  }
  async sendEmailToHiringManager(application: JobApplication) {
    const subject = `New Application arrival`;

    const data = await this.dataSoruce.query(
      "Select * from employee where type='HiringManager'",
    );
    const emails = data.map((manager: { email: string }) => manager.email);

    const text = `
    ${application.status}
    ${application.id}

    `;

    await this.mailService.sendMail({
      from: 'param.s1@gmail.com',
      to: emails,
      subject: subject,
      text: text,
    });
  }
}
