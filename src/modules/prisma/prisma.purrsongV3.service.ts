import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../node_modules/.prisma/purrsongV3';

@Injectable()
export class PurrsongV3Service extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
