import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './service/typeorm.config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiGlobalExceptionFilter } from './filter/api-global.filter';
import { DTOCleanerInteceptor } from './interceptor/dto-cleaner.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ApiGlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DTOCleanerInteceptor,
    },
  ],
})
export class CoreModule {}
