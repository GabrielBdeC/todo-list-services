import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { List } from '../entity/list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(List)
    private listRepository: Repository<List>,
  ) {}

  async findAll(): Promise<List[]> {
    return this.listRepository.find();
  }

  async findById(id: string): Promise<List | null> {
    return this.listRepository.findOneBy({ id: id });
  }

  async create(entity: List): Promise<List> {
    delete entity.id;
    return this.listRepository.save(entity);
  }

  async update(id: string, listData: Partial<List>): Promise<List | null> {
    const list = await this.listRepository.findOneBy({ id: id });
    if (!list) return null;

    Object.assign(list, listData);
    return this.listRepository.save(list);
  }

  async remove(id: string): Promise<boolean> {
    const list = await this.listRepository.findOneBy({ id: id });
    if (!list) return false;

    await this.listRepository.remove(list);
    return true;
  }
}
