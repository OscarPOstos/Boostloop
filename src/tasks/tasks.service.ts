import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const newTask = this.tasksRepository.create({
      ...createTaskDto,
      user: { id: userId }, // Relacionamos la tarea con el usuario
    });
    return this.tasksRepository.save(newTask);
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    // Busca la tarea existente
    const task = await this.tasksRepository.findOne({ where: { id } });
  
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  
    // Aplica los cambios a la tarea existente
    Object.assign(task, updateTaskDto);
  
    // Guarda la tarea actualizada
    return this.tasksRepository.save(task);
  }

  async remove(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async complete(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    task.completed = true;
    return this.tasksRepository.save(task);
  }

  async findIncompleteTasks(userId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { user: { id: parseInt(userId) }, completed: false },
    });
  }

  async findCompletedTasks(userId: string): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { user: { id: parseInt(userId) }, completed: true },
    });
  }
}
