import { Module } from '@nestjs/common';
import { StreamingFileService } from './streaming-file.service';
import { StreamingFileController } from './streaming-file.controller';

@Module({
  controllers: [StreamingFileController],
  providers: [StreamingFileService],
})
export class StreamingFileModule {}
