import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { List } from './list.entity';

@Entity({
  name: 'task',
})
export class Task {
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

  @Column({
    name: 'done',
    type: 'bool',
    default: false,
  })
  public done: boolean;

  @ManyToOne(() => List, list => list.taskItems, {
    nullable: true,
  })
  @JoinColumn({ name: `list_id` })
  public list: List;
}
