import { Controller, Get, Header, Res, StreamableFile } from '@nestjs/common';
import { StreamingFileService } from './streaming-file.service';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('streaming-file')
export class StreamingFileController {
  constructor(private readonly streamingFileService: StreamingFileService) {}

  @Get('stream')
  getFile(@Res() res: Response) {
    const file = createReadStream(join(process.cwd(), 'package.json')); //  return package.json as a example
    // file.pipe(res);
    return new StreamableFile(file);
  }

  @Get('stream1')
  getFile2(@Res() res: Response): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file, {
      type: 'application/json',
      disposition: 'attachment; filename="package.json"',
    });
  }

  // Or even:
  @Get('stream2')
  getFileChangingResponseObjDirectly(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="package.json"',
    });
    return new StreamableFile(file);
  }

  // Or even:
  @Get('stream3')
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename="package.json"')
  getFileUsingStaticValues(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }  

}
