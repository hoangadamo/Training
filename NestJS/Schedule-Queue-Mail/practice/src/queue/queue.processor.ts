import { Processor, WorkerHost, OnWorkerEvent } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('myQueue')
export class QueueProcessor extends WorkerHost {
  async process(job: Job<any, any, string>): Promise<any> {
    // Log the job data
    console.log(`Processing job ${job.id} with data:`, job.data);
    
    // Simulate job processing
    const result = { result: 'Job completed successfully' };
    
    // Log the result
    console.log(`Job ${job.id} result:`, result);
    
    return result;
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Job ${job.id} completed`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.error(`Job ${job.id} failed`);
  }
}
