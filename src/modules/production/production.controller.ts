import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from '../../global/auth.guard';
import { ProductionService } from './production.service';
import { LavvieTagIotCode } from '../../dtos/production.dto';
import { Prisma as PurrsongV3 } from '../../../node_modules/.prisma/purrsongV3';

@Controller('production')
@UseGuards(AuthGuard)
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Post('lavvieTagIotCode')
  lavvieTagIotCode(
    @Body() lavvieTagIotCode: LavvieTagIotCode,
  ): Promise<PurrsongV3.BatchPayload> {
    return this.productionService.lavvieTagIotCode(lavvieTagIotCode);
  }
}
