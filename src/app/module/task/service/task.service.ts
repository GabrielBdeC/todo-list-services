import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entity/task.entity';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private repository: Repository<Task>,
  ) {}

  public async findAll(options?: IPaginationOptions): Promise<Pagination<Task> | Task[]> {
    if (options) {
      const query = this.repository.createQueryBuilder('task').select();
      return paginate<Task>(query, options);
    } else {
      return this.repository.find();
    }
  }

  async findById(id: string): Promise<Task> {
    return this.repository.findOneByOrFail({ id: id });
  }

  async create(entity: Task): Promise<Task> {
    delete entity.id;
    entity.done = false;
    return this.repository.save(entity);
  }

  async update(task: Task): Promise<Task> {
    await this.repository.findOneByOrFail({ id: <string>task.id });
    return this.repository.save(task);
  }

  async remove(id: string): Promise<void> {
    const task = await this.repository.findOneByOrFail({ id: id });
    await this.repository.remove(task);
  }
}
