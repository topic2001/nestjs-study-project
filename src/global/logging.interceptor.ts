import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FastifyRequest } from 'fastify';
import { PurrsongV3Service } from '../modules/prisma/prisma.purrsongV3.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private purrsongV3Service: PurrsongV3Service) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    console.log(
      'Before:::::context::::',
      context.getClass().name,
      context.getHandler().name,
    );
    const now = Date.now();
    return next.handle().pipe(
      tap(async (x) => {
        console.log(`After... ${Date.now() - now}ms`);
        console.log(`successLog : {request:${request.body}, response:${x}}`);
      }),
    );
  }
}
