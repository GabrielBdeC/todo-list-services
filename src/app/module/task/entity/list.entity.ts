import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from './task.entity';

@Entity({
  name: 'list',
})
export class List {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  public id?: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 84,
    nullable: false,
  })
  public name: string;

  @OneToMany(() => Task, task => task.list)
  public taskItems?: Task[];
}
