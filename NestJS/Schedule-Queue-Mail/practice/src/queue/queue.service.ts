import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('myQueue') private readonly myQueue: Queue) {}

  async addJobs(dataArray: any[]) {
    const jobIds = [];
    for (const data of dataArray) {
      const job = await this.myQueue.add('myJob', data);
      console.log(`Added job ${job.id} with data:`, data);
      jobIds.push(job.id);
    }
    return jobIds;
  }
}
