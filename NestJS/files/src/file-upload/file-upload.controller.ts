import { Controller, Post, UseInterceptors, UploadedFile, UsePipes, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { FileSizeValidationPipe } from './file-size-validation.pipe';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(FileSizeValidationPipe)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return { message: 'File uploaded successfully!', file };
  }

  @Post('upload2')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile2(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }), // 1MB
          new FileTypeValidator({ fileType: 'image/jpeg' }), // Only JPEG images
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return { message: 'File uploaded successfully!', file };
  }

  // multiple files
  @Post('upload-multiple')
  @UseInterceptors(FilesInterceptor('files', 10)) // 'files' is the field name, 10 is the max count
  uploadMultipleFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
    return { message: 'Files uploaded successfully!', files };
  }

  @Post('upload-multiple2')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'background', maxCount: 1 },
  ]))
  uploadMultipleFiles2(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
    console.log(files);
    return { message: 'Files uploaded successfully!', files };
  }

}
