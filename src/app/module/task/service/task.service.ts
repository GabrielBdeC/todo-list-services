import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entity/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findById(id: string): Promise<Task | null> {
    return this.taskRepository.findOneBy({ id: id });
  }

  async create(entity: Task): Promise<Task> {
    delete entity.id;
    entity.done = false;
    return this.taskRepository.save(entity);
  }

  async update(id: string, taskData: Partial<Task>): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id: id });
    if (!task) return null;

    Object.assign(task, taskData);
    return this.taskRepository.save(task);
  }

  async remove(id: string): Promise<boolean> {
    const task = await this.taskRepository.findOneBy({ id: id });
    if (!task) return false;

    await this.taskRepository.remove(task);
    return true;
  }
}
