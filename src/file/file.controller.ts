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
import { FileUploadDto } from './dto/file-upload.dto';
// import { CreateFileDto } from './dto/create-file.dto';
// import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import fs from 'fs';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('File')
@ApiBearerAuth('token')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: FileUploadDto,
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    // return file;
    // createWriteStream(join(__dirname, '../src/files', file));
    return 'File was uploaded';
  }

  @Get(':fileName')
  getFile(@Param('fileName') fileName: string) {
    try {
      const path = join(__dirname, '../../src/files', fileName);
      const file = fs.createReadStream(path);
      return new StreamableFile(file);
    } catch {
      throw new NotFoundException('File is not found!');
    }
  }
}
