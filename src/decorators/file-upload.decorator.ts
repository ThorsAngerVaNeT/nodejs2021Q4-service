import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FastifyFileInterceptor } from 'nest-fastify-multer';
import config from '../config/config';

const storageOpts = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
};

export default function FileUpload() {
  return applyDecorators(
    config().USE_FASTIFY === 'true'
      ? FastifyFileInterceptor('file', storageOpts)
      : UseInterceptors(FileInterceptor('file', storageOpts))
  );
}
