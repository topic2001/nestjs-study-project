import { Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { LavvieTagIotCode } from '../../dtos/production.dto';
import { PurrsongProductionService } from '../prisma/prisma.purrsongProduction.service';
import { PurrsongV3Service } from '../prisma/prisma.purrsongV3.service';
import { Prisma as PurrsongV3 } from '../../../node_modules/.prisma/purrsongV3';
// import { Prisma as PurrsongProduction } from '../../../node_modules/.prisma/purrsongProduction';

@Injectable()
export class ProductionService {
  constructor(
    private purrsongV3Service: PurrsongV3Service,
    private purrsongProductionService: PurrsongProductionService,
  ) {}

  async lavvieTagIotCode(lavvieTagIotCode: LavvieTagIotCode) {
    const macAddrAndrfid =
      await this.purrsongProductionService.lavvieTagProduction.findMany({
        where: {
          creationTime: {
            gte: new Date(lavvieTagIotCode.gte),
            lt: new Date(lavvieTagIotCode.lt),
          },
          macAddr: {
            notIn: lavvieTagIotCode.notIn,
          },
        },
        select: {
          macAddr: true,
          rfid: true,
        },
      });

    const updateDatas: PurrsongV3.Enumerable<PurrsongV3.iotCodeCreateManyInput> =
      macAddrAndrfid.map((data) => {
        return {
          iotCode: 'TAG1' + data.macAddr,
          rfid: data.rfid,
          iotFirmwareGroupId: 4,
        };
      });

    const count: PurrsongV3.BatchPayload =
      await this.purrsongV3Service.iotCode.createMany({
        data: updateDatas,
      });

    return count;
  }
}
