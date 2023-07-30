import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Task } from '../entity/task.entity';
import { TaskService } from '../service/task.service';
import { TaskMapper } from '../mapper/task.mapper';
import { TaskDto } from '../dto/task.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('v1/task')
export class TaskController {
  constructor(
    private service: TaskService,
    private mapper: TaskMapper,
  ) {}

  @Get('/paginated')
  public async viewAllPaginated(
    @Query('numberPage', new DefaultValuePipe(1), ParseIntPipe)
    page = 1,
    @Query('pageItems', new DefaultValuePipe(30), ParseIntPipe)
    limit = 30,
  ): Promise<Pagination<TaskDto>> {
    limit = limit > 100 ? 100 : limit;
    const paginatedTaskList = <Pagination<Task>>await this.service.findAll({ page, limit });
    return new Pagination<Task>(
      paginatedTaskList.items.map((task: Task) => this.mapper.toDto(task)),
      paginatedTaskList.meta,
      paginatedTaskList.links,
    );
  }

  @Get()
  public async getAll(): Promise<TaskDto[]> {
    const taskList = <Task[]>await this.service.findAll();
    return taskList.map((task: Task) => this.mapper.toDto(task));
  }

  @Get('/:id')
  public async getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<TaskDto> {
    const task = await this.service.findById(id);
    return this.mapper.toDto(task);
  }

  @Post()
  public async create(@Body() taskDto: TaskDto): Promise<Task> {
    const task = this.mapper.toEntity(taskDto);
    const newTask = await this.service.create(task);
    return this.mapper.toDto(newTask);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  public async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() taskDto: TaskDto): Promise<Task | null> {
    taskDto.id = id;
    const task = this.mapper.toEntity(taskDto);
    const updatedTask = await this.service.update(task);
    return this.mapper.toDto(updatedTask);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    this.service.remove(id);
  }
}
