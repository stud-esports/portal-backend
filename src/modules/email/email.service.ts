import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { MailgunService } from '@nextnm/nestjs-mailgun';
import nodemailer from 'nodemailer';

// ИНТЕРФЕЙСЫ
// import { IEmailOptions } from './interfaces/email-options.interface';

@Injectable()
export class EmailService {
  mail: any;
  // constructor(private mailgunService: MailgunService) {
  constructor(private _mailerService: MailerService) {}

  async sendEmail() {
    console.log('sent');
    await this._mailerService.sendMail({
      to: 'drmrhdt@gmail.com',
      from: 'drmrhdt@gmail.com',
      subject: 'test!',
      template: './confirmation',
    });
  }

  // async sendMail() {
  //   this.mail = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: 'drmrhdt@gmail.com',
  //       pass: 'J1007b%!z3HWcFNayyng',
  //     },
  //   });

  //   const mailOptions = {
  //     from: 'drmrhdt@gmail.com',
  //     to: 'drmrhdt@gmail.com',
  //     subject: 'Sending Email via Node.js',
  //     text: 'That was easy!',
  //   };

  //   this.mail.sendMail(mailOptions, function (error, info) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //     }
  //   });
  // }

  // async sendEmail(data: IEmailOptions): Promise<any> {
  //   return await this.mailgunService.createEmail(,data);
  // }

  // async verifyEmail(email: string): Promise<boolean> {
  //   return await this.mailgunService.validateEmail(email);
  // }
}
