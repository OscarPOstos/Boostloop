import { Injectable } from '@nestjs/common';
import { TimeTrackingService } from '../time-tracking/time-tracking.service';
import { TasksService } from '../tasks/tasks.service';

@Injectable()
export class RecommendationsService {
  constructor(
    private readonly timeTrackingService: TimeTrackingService,
    private readonly tasksService: TasksService,
  ) {}

  async getRecommendations(userId: string): Promise<string[]> {
    const recentSessions = await this.timeTrackingService.getRecentSessions(userId, 7); // Últimos 7 días
    const activeTasks = await this.tasksService.findIncompleteTasks(userId);

    // Análisis básico para recomendaciones
    const recommendations = [];

    if (recentSessions.length === 0) {
      recommendations.push('Comienza una nueva sesión de trabajo para mantener tu productividad.');
    } else {
      const totalHours = recentSessions.reduce((acc, session) => acc + session.duration, 0);
      if (totalHours < 5) {
        recommendations.push('Intenta dedicar al menos 1 hora diaria para alcanzar tus metas.');
      }
    }

    if (activeTasks.length > 0) {
      recommendations.push(`Tienes ${activeTasks.length} tareas pendientes. Prioriza las más importantes.`);
    } else {
      recommendations.push('¡Buen trabajo! Has completado todas tus tareas.');
    }

    return recommendations;
  }
}

