import { Module } from '@nestjs/common';
import { Task } from './entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entity/list.entity';
import { ListController } from './controller/list.controller';
import { TaskController } from './controller/task.controller';
import { TaskService } from './service/task.service';
import { ListService } from './service/list.service';

@Module({
  controllers: [TaskController, ListController],
  imports: [TypeOrmModule.forFeature([Task, List])],
  providers: [TaskService, ListService],
})
export class TaskModule {}
