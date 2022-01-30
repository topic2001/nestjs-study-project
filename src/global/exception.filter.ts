import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PurrsongV3Service } from '../modules/prisma/prisma.purrsongV3.service';
import { FastifyRequest, FastifyReply } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private purrsongV3Service: PurrsongV3Service) {}
  async catch(exception: any, host: ArgumentsHost) {
    console.log('errorLog:::', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception instanceof CustomError
        ? HttpStatus.BAD_REQUEST
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).send({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
