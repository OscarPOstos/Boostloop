import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Task } from 'src/tasks/task.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class TimeTracking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @Column({ nullable: true, type: 'int' })
  duration: number; // En segundos

  @ManyToOne(() => Task, task => task.timeTracking)
  task: Task;

  @ManyToOne(() => User, user => user.timeTracking)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}