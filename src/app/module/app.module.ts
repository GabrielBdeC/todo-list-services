import { Module } from '@nestjs/common';
import { CoreModule } from 'src/app/core/core.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [CoreModule, TaskModule],
})
export class AppModule {}
