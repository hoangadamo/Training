import { Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File){
    console.log(file);
  }

  @Post('upload2')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile2(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }

}
