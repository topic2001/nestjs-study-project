import { Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { redis } from '../../config/redis.session';
import { LoginDto, LoginResponse } from '../../dtos/auth.dto';
import { createPassword } from '../../utils/createHashes';
import { PurrsongV3Service } from '../prisma/prisma.purrsongV3.service';
// import { Prisma } from '@prisma/client';
import { Prisma as PurrsongV3 } from '../../../node_modules/.prisma/purrsongV3';
// import { Prisma as PurrsongProduction } from '../../../node_modules/.prisma/purrsongProduction';

@Injectable()
export class AuthService {
  constructor(private purrsongV3Service: PurrsongV3Service) {}

  async login(
    loginDto: LoginDto,
    request: FastifyRequest,
  ): Promise<LoginResponse> {
    const user = await this.purrsongV3Service.user.findUnique({
      where: { email: loginDto.name },
      // rejectOnNotFound: true,
    });

    if (createPassword(loginDto.password) === user?.password) {
      const keys = await redis.keys('sess:*');
      const values = await redis.mget(keys);
      for (let i = 0; i < values.length; i++) {
        if (
          values[i].includes(`{"email":"${user.email}","userId":${user.id}`)
        ) {
          redis.del(keys[i]);
          break;
        }
      }
      request.session.set('email', user.email);
      request.session.set('userId', user.id);
      return { id: user.id, email: user.email, nickname: user.nickname };
    }
    throw new CustomError('login fail');
  }

  async logout(request: FastifyRequest): Promise<string> {
    // console.log('ddddd', request.session);
    await request.session.destroy();
    return `logout~~~~~`;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
