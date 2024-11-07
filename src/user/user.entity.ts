import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';
import { TimeTracking } from 'src/time-tracking/time-tracking.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
    
  @OneToMany(() => TimeTracking, timeTracking => timeTracking.user)
  timeTracking: TimeTracking[]; 
}
