import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { createReadStream, existsSync } from 'fs';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

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
    if (!existsSync(path)) new NotFoundException();
    const file = createReadStream(path);
    return new StreamableFile(file);
  }

  /*   @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  } */
}
