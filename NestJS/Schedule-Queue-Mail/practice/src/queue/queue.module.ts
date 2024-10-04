import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { QueueProcessor } from './queue.processor';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'myQueue',
    }),
  ],
  providers: [QueueProcessor, QueueService],
  controllers: [QueueController],
})
export class QueueModule {}


