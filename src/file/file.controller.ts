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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import FileUpload from '../decorators/file-upload.decorator';

@ApiTags('File')
@ApiBearerAuth('token')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @FileUpload()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: FileUploadDto,
  })
  @ApiOkResponse({ description: 'File :fileName was uploaded' })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    // return file;
    // createWriteStream(join(__dirname, '../src/files', file));
    return `File ${file.originalname} was uploaded`;
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
