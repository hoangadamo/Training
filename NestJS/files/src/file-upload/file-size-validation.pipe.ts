import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const oneKb = 1000000;
    if (value.size > oneKb) {
      throw new BadRequestException('File size exceeds the limit of 1MB');
    }
    return value;
  }
}
