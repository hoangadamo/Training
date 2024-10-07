import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { FileSizeValidationPipe } from './file-upload/file-size-validation.pipe';
import { StreamingFileModule } from './streaming-file/streaming-file.module';

@Module({
  imports: [FileUploadModule, StreamingFileModule],
  controllers: [AppController],
  providers: [AppService, FileSizeValidationPipe],
})
export class AppModule {}
