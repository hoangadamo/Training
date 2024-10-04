import { Controller, Post, Body } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('add-multiple')
  async addJobs(@Body() dataArray: any[]) {
    const jobIds = await this.queueService.addJobs(dataArray);
    return { jobIds };
  }
}
