import { Injectable } from '@nestjs/common';
import { Task } from '../entity/task.entity';
import { TaskDto } from '../dto/task.dto';
import { List } from '../entity/list.entity';

@Injectable()
export class TaskMapper {
  public toDto(entity: Task): TaskDto {
    const dto = new TaskDto();
    dto.id = entity.id ?? '';
    dto.name = entity.name;
    dto.done = entity.done;
    dto.listId = entity.list?.id ?? '';
    return dto;
  }

  public toEntity(dto: TaskDto): Task {
    const entity = new Task();
    entity.list = new List();
    entity.id = dto.id ?? '';
    entity.name = dto.name;
    entity.done = dto.done;
    entity.list.id = dto.listId ?? '';
    return dto;
  }
}
