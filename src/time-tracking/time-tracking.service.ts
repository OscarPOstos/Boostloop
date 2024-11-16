import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThanOrEqual, Repository } from 'typeorm';
import { TimeTracking } from './time-tracking.entity';
import { StartTrackingDto } from './dto/start-tracking.dto';
import { StopTrackingDto } from './dto/stop-tracking.dto';
import { Task } from 'src/tasks/task.entity';
import { subDays } from 'date-fns';

@Injectable()
export class TimeTrackingService {
  constructor(
    @InjectRepository(TimeTracking)
    private readonly timeTrackingRepository: Repository<TimeTracking>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async startTracking(userId: string, startTrackingDto: StartTrackingDto): Promise<TimeTracking> {
    console.log(userId)
    const task = await this.taskRepository.findOne({ where: { id: startTrackingDto.taskId, user: { id: parseInt(userId) } } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${startTrackingDto.taskId} not found for the current user`);
    }

    const newSession = this.timeTrackingRepository.create({
      task,
      user: { id: userId } as any,
      startTime: new Date(),
    });
    return this.timeTrackingRepository.save(newSession);
  }

  async stopTracking(userId: string, stopTrackingDto: StopTrackingDto): Promise<TimeTracking> {
    const session = await this.timeTrackingRepository.findOne({
      where: { id: stopTrackingDto.sessionId, user: { id: parseInt(userId) } },
    });

    if (!session || session.endTime) {
      throw new NotFoundException(`Active time tracking session with ID ${stopTrackingDto.sessionId} not found`);
    }

    session.endTime = new Date();
    session.duration = Math.floor((session.endTime.getTime() - session.startTime.getTime()) / 1000); // Calcula la duración en segundos
    return this.timeTrackingRepository.save(session);
  }

  async getSessions(userId: string): Promise<TimeTracking[]> {
    return this.timeTrackingRepository.find({
      where: { user: { id: parseInt(userId) } },
      relations: ['task'],
    });
  }

  async getSessionsForPeriod(userId: string, startDate: Date, endDate: Date): Promise<TimeTracking[]> {
    return this.timeTrackingRepository.find({
      where: {
        user: { id: parseInt(userId) },
        startTime: Between(startDate, endDate),
      },
    });
  }

  async getRecentSessions(userId: string, days: number): Promise<TimeTracking[]> {
    const fromDate = subDays(new Date(), days);
    return this.timeTrackingRepository.find({
      where: {
        user: { id: parseInt(userId) },
        startTime: MoreThanOrEqual(fromDate),
      },
    });
  }

  async getTotalDuration(userId: string): Promise<number> {
    const sessions = await this.timeTrackingRepository.find({ where: { user: { id: parseInt(userId) } } });
    return sessions.reduce((total, session) => total + session.duration, 0);
  }
}