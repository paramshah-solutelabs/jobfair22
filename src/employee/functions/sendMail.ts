import { Injectable } from '@nestjs/common';
import { ServerClient } from 'postmark';

@Injectable()
export class SendEmailToUserService {
  private postmarkClient: ServerClient;

  constructor() {
    if (!process.env.POSTMARK_SERVER_TOKEN) {
      throw new Error('Missing Postmark API token. Set POSTMARK_SERVER_TOKEN in .env');
    }
    this.postmarkClient = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);
  }

  async inviteEmployee(role: string, name: string, email: string, token: string) {

    const subject = `Invitation to register to the portal`;
    const templateId = 39114310;  

    const templateData = {
      name,
      token,
      action_url: `http://yourwebsite.com/register?token=${token}`, // Use the correct URL
      role
    };

    try {
      const response = await this.sendEmailWithTemplate(email, templateId, templateData);
      return response;
    } catch (error) {
      console.error('Failed to send email:', error.message);
      throw new Error('Error sending email: ' + error.message);
    }
  }

  private async sendEmailWithTemplate(email: string, templateId: number, templateData: any) {
    return await this.postmarkClient.sendEmailWithTemplate({
      From: 'param.s1@solutelabs.com',
      To: email,
      TemplateId: templateId,
      TemplateModel: templateData, 
    });
  }
}
