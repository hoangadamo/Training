import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Invoice } from 'src/entities/invoice.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendUserConfirmation(user: User) {
    await this.mailerService
      .sendMail({
        to: user.email,
        from: 'viethoangb0410@gmail.com',
        subject: 'Welcome to Nice App! Confirm your Email',
        template: 'confirmation',
        context: {
          name: user.firstname + user.lastname,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async sendOvedueInvoice(user: User, invoiceIds: string[]) {
    await this.mailerService
      .sendMail({
        to: user.email,
        from: 'viethoangb0410@gmail.com',
        subject: 'Notification Overdue Invoices',
        template: 'confirmation',
        context: {
          name: user.lastname + ' '+ user.firstname,
          ids: invoiceIds.join(', ')
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
