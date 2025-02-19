import { Injectable } from '@nestjs/common';
import { ServerClient } from 'postmark';

@Injectable()
export class SendEmailToUserService {
  private postmarkClient: ServerClient;

  constructor() {
    this.postmarkClient = new ServerClient(process.env.POSTMARK_SERVER_TOKEN);
  }

  async forgotPassword(name:string,email: string, token: string, expiryDate: string) {
    const subject = `Reset your password`;

    const templateId = 39079914;  

    const templateData = {
      name: name, 
      expiry_date: expiryDate,
      token: token,
      action_url: 'http://yourwebsite.com/reset-password',
    };

    await this.sendEmailWithTemplate(email, templateId, templateData);
  }

  async sendEmailWithTemplate(email: string, templateId: number, templateData: any) {
    try {
      const response = await this.postmarkClient.sendEmailWithTemplate({
        From: 'param.s1@solutelabs.com',
        To: email,
        TemplateId: templateId,
        TemplateModel: templateData, 
      });

      return response;
    } catch (error) {
      throw new Error('Error sending email: ' + error.message);
    }
  }
}
