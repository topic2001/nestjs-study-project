import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FastifyRequest } from 'fastify';
import { AuthGuard } from '../../global/auth.guard';
import { LoginDto, LoginResponse } from '../../dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(
    @Body() loginDto: LoginDto,
    @Req() request: FastifyRequest,
  ): Promise<LoginResponse> {
    return this.authService.login(loginDto, request);
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  logout(@Req() request: FastifyRequest): Promise<string> {
    return this.authService.logout(request);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
