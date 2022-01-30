import { Global, Module } from '@nestjs/common';
import { PurrsongV3Service } from './prisma.purrsongV3.service';
import { PurrsongProductionService } from './prisma.purrsongProduction.service';

@Global()
@Module({
  providers: [PurrsongV3Service, PurrsongProductionService],
  exports: [PurrsongV3Service, PurrsongProductionService],
})
export class PrismaModule {}
