import { FastifySessionOptions } from '@mgcrea/fastify-session';
import { RedisStore } from 'fastify-redis-session';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

export function sessionOptions(
  configService: ConfigService,
): FastifySessionOptions {
  const cookieExpires = new Date();
  cookieExpires.setHours(cookieExpires.getHours() + 6);
  return {
    secret: configService.get('sessionSecret'),
    cookieName: 'Purrsong',
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      expires: cookieExpires,
      secure: configService.get('NODE_ENV', 'dev') === 'production', //NODE_ENV defalut값 dev
      domain:
        configService.get('NODE_ENV') === 'production'
          ? '.purrsong.co'
          : undefined,
    },
    store: new RedisStore({
      client: redis,
      ttl: 1800,
    }),
    saveUninitialized: false,
  };
}

export const redis = new Redis({
  port: 6379,
  host: 'localhost',
  // password: process.env.REDIS_PASSWORD,
  // retryStrategy: (times) => Math.max(times * 100, 3000),
});
