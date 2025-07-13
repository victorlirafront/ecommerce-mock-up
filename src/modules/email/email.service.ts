import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });
  }

  async sendEmail(data: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) {
    const { name, email, phone, subject, message } = data;

    const mailOptions = {
      from: {
        name,
        address: process.env.USER_EMAIL,
      },
      to: ['victorliracorporativo@gmail.com'],
      subject: `${subject} ✔`,
      text: 'Hello world?',
      html: `
        <p> celular: ${phone} </p>
        <p> email: ${email} </p>
        <p> mensagem: ${message} </p>
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email has been sent');
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Erro ao enviar o email');
    }
  }
}
