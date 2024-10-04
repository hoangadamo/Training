import { Injectable, NotFoundException } from '@nestjs/common';
import { Invoice } from 'src/entities/invoice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { CreateInvoiceDto } from './dto/invoice.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from 'src/entities/user.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async create(payload: CreateInvoiceDto): Promise<Invoice> {
    const { dueDate, userId } = payload;
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const newInvoice = this.invoicesRepository.create({
      dueDate,
      user,
      status: 'New',
    });
    await this.invoicesRepository.save(newInvoice);
    return newInvoice;
  }

  @Cron(CronExpression.EVERY_MINUTE) // every 1 minute
  async cron() {
    const invoices = await this.invoicesRepository.find({
      where: {
        dueDate: LessThan(new Date()),
        status: 'New',
      },
      relations: ['user'],
    });
    if (invoices.length > 0) {
      const userInvoicesMap = new Map(); // Map: {key: userId, value: {user: User, invoiceIds}}
      for (const invoice of invoices) {
        invoice.status = 'Overdue';
        await this.invoicesRepository.save(invoice);
        if (!userInvoicesMap.has(invoice.user.id)) {
          userInvoicesMap.set(invoice.user.id, {
            user: invoice.user,
            invoiceIds: [],
          });
        }
        userInvoicesMap.get(invoice.user.id).invoiceIds.push(invoice.id);
      }
      console.log(userInvoicesMap);
      for (const { user, invoiceIds } of userInvoicesMap.values()) {
        await this.mailService.sendOvedueInvoice(user, invoiceIds);
      }
    }
  }
}
