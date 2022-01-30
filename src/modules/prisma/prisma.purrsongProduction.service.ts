import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../node_modules/.prisma/purrsongProduction';

@Injectable()
export class PurrsongProductionService
  extends PrismaClient
  implements OnModuleInit
{
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
