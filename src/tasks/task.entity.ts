import { TimeTracking } from 'src/time-tracking/time-tracking.entity';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: false })
  completed: boolean; // Agregar campo para completar tareas

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;
  
  @OneToMany(() => TimeTracking, timeTracking => timeTracking.task)
  timeTracking: TimeTracking[]; 
}