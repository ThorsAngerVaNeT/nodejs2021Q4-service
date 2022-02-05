import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseFile implements PipeTransform {
  transform(file: Express.Multer.File): Express.Multer.File {
    if (file === undefined || file === null) {
      throw new BadRequestException('Validation failed (file expected)');
    }

    return file;
  }
}
