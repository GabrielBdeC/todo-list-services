import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { Task } from '../entity/task.entity';
import { TaskService } from '../service/task.service';

@Controller('v1/task')
export class TaskController {
  constructor(private service: TaskService) {}

  @Get()
  public async getAll(): Promise<Task[]> {
    return this.service.findAll();
  }

  @Get('/:id')
  public async getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Task | null> {
    return this.service.findById(id);
  }

  @Post()
  public async create(@Body() task: Task): Promise<Task> {
    return this.service.create(task);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  public async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() task: Task): Promise<Task | null> {
    return this.service.update(id, task);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    this.service.remove(id);
  }
}
