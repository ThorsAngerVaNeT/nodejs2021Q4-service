import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    // console.log(request.headers);
    const userAgent = '';

    this.logger.log(
      `${method} ${url} ${JSON.stringify(request.body)} - ${userAgent} ${ip}`
    );

    response.on('close', () => {
      const { statusCode } = response;
      // const contentLength = response.get('content-length');
      const contentLength = 0;

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}`
      );
    });

    next();
  }
}
