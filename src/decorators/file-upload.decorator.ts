import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileFastifyInterceptor } from 'fastify-file-interceptor';
import config from '../config/config';
import { extname } from 'path';

const storageOpts = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
      const name = sanitize(file.originalname.split('.')[0]);
      const fileExtName = extname(file.originalname);
      const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      callback(null, `${name}-${randomName}${fileExtName}`);
    },
  }),
};

const illegalRe = /[\/\?<>\\:\*\|":#]/g;
const controlRe = /[\x00-\x1f\x80-\x9f]/g;
const reservedRe = /^\.+$/;
const windowsReservedRe = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;

function sanitize(input: string, replacement = '') {
  const sanitized = input
    .replace(illegalRe, replacement)
    .replace(controlRe, replacement)
    .replace(reservedRe, replacement)
    .replace(windowsReservedRe, replacement);
  return sanitized;
}

export default function FileUpload() {
  return applyDecorators(
    UseInterceptors(
      (config().USE_FASTIFY === 'true'
        ? FileFastifyInterceptor
        : FileInterceptor)('file', storageOpts)
    )
  );
}
