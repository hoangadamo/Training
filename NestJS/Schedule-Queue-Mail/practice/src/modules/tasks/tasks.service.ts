import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    // @Cron('45 * * * * *')
    // handleCron(){
    //     this.logger.debug('Called when the current second is 45');
    // }

    // @Cron(CronExpression.EVERY_30_SECONDS)
    // handleCron() {
    //     this.logger.debug('Called every 30 seconds');
    // }

    // @Interval(10000)
    // handleInterval() {
    //     this.logger.debug('Called every 10 seconds');
    // }
}
