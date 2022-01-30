import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProductionModule } from './modules/production/production.module';

@Module({
  imports: [
    ProductionModule,
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env.dev', '.env.production'],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
