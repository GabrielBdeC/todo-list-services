import { Test } from '@nestjs/testing';
import { ListService } from './list.service';
import { List } from '../entity/list.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('ListService', () => {
  let service: ListService;
  let repository: Repository<List>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ListService,
        {
          provide: getRepositoryToken(List),
          useClass: Repository,
        },
      ],
    }).compile();

    service = moduleRef.get<ListService>(ListService);
    repository = moduleRef.get<Repository<List>>(getRepositoryToken(List));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of list when calling findAll', async () => {
    const mockList: List[] = [
      { id: 'id1', name: 'List 1' },
      { id: 'id2', name: 'List 2' },
    ];
    jest.spyOn(repository, 'find').mockResolvedValueOnce(mockList);

    const result = await service.findAll();
    expect(result).toEqual(mockList);
  });

  it('should return a list when calling findById with a valid ID', async () => {
    const id = 'id';
    const mockList: List = { id: id, name: 'List 1' };
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(mockList);

    const result = await service.findById(id);
    expect(result).toEqual(mockList);
  });

  it('should return null when calling findById with an invalid ID', async () => {
    const id = 'invalidId';
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

    const result = await service.findById(id);
    expect(result).toBeNull();
  });

  it('should create a new list when calling create', async () => {
    const list: List = { id: 'firstGivenId', name: 'New List' };
    const createdList: List = { ...list, id: 'id' };
    const listToCreate = structuredClone(list);
    delete listToCreate.id;
    jest.spyOn(repository, 'save').mockResolvedValueOnce(createdList);

    const result = await service.create(listToCreate);
    expect(result).toEqual(createdList);
    expect(repository.save).toBeCalledWith(listToCreate);
  });

  it('should update an existing list when calling update with a valid ID', async () => {
    const id = '1';
    const existingList: List = { id: id, name: 'List 1' };
    const updatedListData: Partial<List> = { name: 'new name List' };
    const updatedList: List = { ...existingList, ...updatedListData };
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(existingList);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedList);

    const result = await service.update(id, updatedListData);
    expect(result).toEqual(updatedList);
  });

  it('should return null when calling update with an invalid ID', async () => {
    const id = 'invalidId';
    const updatedListData: Partial<List> = { name: 'new name List' };
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

    const result = await service.update(id, updatedListData);
    expect(result).toBeNull();
  });

  it('should remove an existing list when calling remove with a valid ID', async () => {
    const id = '1';
    const existingList: List = { id: id, name: 'List 1' };
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(existingList);
    jest.spyOn(repository, 'remove').mockResolvedValueOnce(existingList);

    const result = await service.remove(id);
    expect(result).toBe(true);
  });

  it('should return false when calling remove with an invalid ID', async () => {
    const id = 'invalidId';
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

    const result = await service.remove(id);
    expect(result).toBe(false);
  });
});
