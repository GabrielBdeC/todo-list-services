import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { CoreModule } from 'src/app/core/core.module';

@Module({
  imports: [CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
