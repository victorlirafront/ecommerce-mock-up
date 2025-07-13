import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('api')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('sendEmail')
  async sendEmail(
    @Body()
    data: {
      name: string;
      email: string;
      phone: string;
      subject: string;
      message: string;
    },
  ) {
    await this.emailService.sendEmail(data);
    return { message: 'Email enviado com sucesso' };
  }
}
