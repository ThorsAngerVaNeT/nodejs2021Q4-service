import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  NotFoundException,
  StreamableFile,
  Body,
  HttpException,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileUploadDto } from './dto/file-upload.dto';
// import { CreateFileDto } from './dto/create-file.dto';
// import { UpdateFileDto } from './dto/update-file.dto';
import { join } from 'path';
import * as fs from 'fs';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import FileUpload from '../decorators/file-upload.decorator';
import { Public } from '../auth/public.decorator';

@ApiTags('File')
@ApiBearerAuth('token')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @FileUpload()
  @ApiOperation({
    summary: 'Upload file',
    description: 'Uploads file to server',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File to upload',
    type: FileUploadDto,
  })
  @ApiOkResponse({ description: 'File :fileName was uploaded' })
  async uploadFile(
    @Body() FileUploadDto: FileUploadDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    // console.log(file);
    return `File ${file.originalname} was uploaded`;
  }

  @Public()
  @Get(':fileName')
  @ApiOperation({
    summary: 'Download file',
    description: 'Download file by fileName from server',
  })
  @ApiOkResponse({ description: `File con` })
  getFile(@Param('fileName') fileName: string) {
    try {
      const path = join(__dirname, '../../uploads', fileName);
      const file = fs.createReadStream(path);
      return new StreamableFile(file);
    } catch {
      throw new NotFoundException('File is not found!');
    }
  }
}
