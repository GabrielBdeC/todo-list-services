import { Test } from '@nestjs/testing';
import { TaskService } from './task.service';
import { Task } from '../entity/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { List } from '../entity/list.entity';

describe('TaskService', () => {
  let service: TaskService;
  let repository: Repository<Task>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    service = moduleRef.get<TaskService>(TaskService);
    repository = moduleRef.get<Repository<Task>>(getRepositoryToken(Task));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of task when calling findAll', async () => {
    const mockTask: Task[] = [
      { id: 'id1', name: 'Task 1', done: false, list: new List() },
      { id: 'id2', name: 'Task 2', done: true, list: new List() },
    ];
    jest.spyOn(repository, 'find').mockResolvedValueOnce(mockTask);

    const result = await service.findAll();
    expect(result).toEqual(mockTask);
  });

  it('should return a task when calling findById with a valid ID', async () => {
    const id = 'id';
    const mockTask: Task = { id: id, name: 'Task 1', done: false, list: new List() };
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(mockTask);

    const result = await service.findById(id);
    expect(result).toEqual(mockTask);
  });

  it('should return null when calling findById with an invalid ID', async () => {
    const id = 'invalidId';
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

    const result = await service.findById(id);
    expect(result).toBeNull();
  });

  it('should create a new task when calling create', async () => {
    const task: Task = { id: 'firstGivenId', name: 'New Task', list: new List(), done: false };
    const createdTask: Task = { ...task, id: 'id' };
    const taskToCreate = structuredClone(task);
    delete taskToCreate.id;
    jest.spyOn(repository, 'save').mockResolvedValueOnce(createdTask);

    const result = await service.create(taskToCreate);
    expect(result).toEqual(createdTask);
    expect(repository.save).toBeCalledWith(taskToCreate);
  });

  it('should update an existing task when calling update with a valid ID', async () => {
    const id = '1';
    const existingTask: Task = { id: id, name: 'Task 1', list: new List(), done: false };
    const updatedTaskData: Partial<Task> = { done: true };
    const updatedTask: Task = { ...existingTask, ...updatedTaskData };
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(existingTask);
    jest.spyOn(repository, 'save').mockResolvedValueOnce(updatedTask);

    const result = await service.update(id, updatedTaskData);
    expect(result).toEqual(updatedTask);
  });

  it('should return null when calling update with an invalid ID', async () => {
    const id = 'invalidId';
    const updatedTaskData: Partial<Task> = { done: true };
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(null);

    const result = await service.update(id, updatedTaskData);
    expect(result).toBeNull();
  });

  it('should remove an existing task when calling remove with a valid ID', async () => {
    const id = '1';
    const existingTask: Task = { id: id, name: 'Task 1', list: new List(), done: true };
    jest.spyOn(repository, 'findOneBy').mockResolvedValueOnce(existingTask);
    jest.spyOn(repository, 'remove').mockResolvedValueOnce(existingTask);

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
