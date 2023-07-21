import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { List } from '../entity/list.entity';
import { ListService } from '../service/list.service';

@Controller('v1/list')
export class ListController {
  constructor(private service: ListService) {}

  @Get()
  public async getAll(): Promise<List[]> {
    return this.service.findAll();
  }

  @Get('/:id')
  public async getOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<List | null> {
    return this.service.findById(id);
  }

  @Post()
  public async create(@Body() list: List): Promise<List> {
    return this.service.create(list);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  public async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() list: List): Promise<List | null> {
    return this.service.update(id, list);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    this.service.remove(id);
  }
}
