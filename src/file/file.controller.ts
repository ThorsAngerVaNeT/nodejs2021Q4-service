import {
  Controller,
  Get,
  Post,
  Param,
  UploadedFile,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { FileUploadDto } from './dto/file-upload.dto';
import { join } from 'path';
import { createReadStream } from 'fs';
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
import { ParseFile } from './file-validation.pipe';

@ApiTags('File')
@ApiBearerAuth('token')
@Controller('file')
export class FileController {
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
  @ApiOkResponse({
    description: 'File was uploaded. Filename to download file is :fileName',
  })
  async uploadFile(@UploadedFile(ParseFile) file: Express.Multer.File) {
    return `File was uploaded. Filename to download file is ${file.filename}`;
  }

  @Public()
  @Get(':fileName')
  @ApiOperation({
    summary: 'Download file',
    description: 'Download file by fileName from server',
  })
  @ApiOkResponse({ description: `File content` })
  getFile(@Param('fileName') fileName: string) {
    try {
      const path = join(__dirname, '../../uploads', fileName);
      const file = createReadStream(path);
      return new StreamableFile(file);
    } catch {
      throw new NotFoundException('File is not found!');
    }
  }
}
