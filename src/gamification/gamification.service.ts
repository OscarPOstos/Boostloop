import { Injectable } from '@nestjs/common';
import { TasksService } from '../tasks/tasks.service';
import { TimeTrackingService } from '../time-tracking/time-tracking.service';

@Injectable()
export class GamificationService {
  constructor(
    private readonly tasksService: TasksService,
    private readonly timeTrackingService: TimeTrackingService,
  ) {}

  async getUserPoints(userId: string): Promise<number> {
    const completedTasks = await this.tasksService.findCompletedTasks(userId);
    const productiveSessions = await this.timeTrackingService.getTotalDuration(userId);

    const pointsFromTasks = completedTasks.length * 10; // 10 puntos por tarea completada
    const pointsFromTime = Math.floor(productiveSessions / 60); // 1 punto por hora productiva

    return pointsFromTasks + pointsFromTime;
  }

  async getUserBadges(userId: string): Promise<string[]> {
    const points = await this.getUserPoints(userId);
    const badges = [];

    if (points >= 100) badges.push('Productividad Máxima');
    if (points >= 50) badges.push('Maestro del Tiempo');
    if (points >= 20) badges.push('Buen Comienzo');

    return badges;
  }
}
