import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './modules/tasks/tasks.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/connectDB';
import { MailModule } from './mail/mail.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UsersModule,
    TasksModule,
    InvoiceModule,
    TypeOrmModule.forRoot(AppDataSource.options),
    // QueueModule,
    MailModule
  ],
  providers: [],
})
export class AppModule {}
