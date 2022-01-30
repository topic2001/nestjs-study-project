import { kSessionData } from '@mgcrea/fastify-session/lib/session';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest } from 'fastify';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    if (request.session.get('email')) {
      request.session.set('requestTime', new Date().toISOString());
      // request.session.touch();
      console.log('::::session', request.session[kSessionData]);
      return true;
    }
    request.session.destroy();
    throw new CustomError('auth fail', 'ddddd');
  }
}
