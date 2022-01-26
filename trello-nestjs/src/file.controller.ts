import {
  Controller,
  Post,
  Get,
  StreamableFile,
  Param,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { createReadStream, createWriteStream, stat } from 'fs';
import { diskStorage } from 'multer';
import { join, basename, extname } from 'path';

@Controller('file')
export class FileController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/files',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // createWriteStream(join(__dirname, '../src/files', file));
    console.log(file);
  }

  @Get(':fileName')
  getFile(@Param('fileName') fileName: string) {
    const path = join(__dirname, '../src/files', fileName);
    const file = createReadStream(path);
    if (!file) new NotFoundException();
    file.on('error', function (err) {
      console.log(err);
      return new NotFoundException();
    });
    return new StreamableFile(file);
  }
}
