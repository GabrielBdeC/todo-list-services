import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('TYPEORM_HOST') ?? 'localhost',
      port: this.configService.get<number>('TYPEORM_PORT') ?? 5432,
      username: this.configService.get<string>('TYPEORM_USERNAME') ?? 'postgres',
      password: this.configService.get<string>('TYPEORM_PASSWORD') ?? '',
      database: this.configService.get<string>('TYPEORM_DATABASE') ?? 'postgres',
      entities: ['dist/app/module/*/entity/*.entity.js'],
      synchronize: true,
    };
  }
}
