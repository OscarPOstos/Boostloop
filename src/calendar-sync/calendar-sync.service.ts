import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TasksService } from '../tasks/tasks.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CalendarSyncService {
  constructor(
    private readonly httpService: HttpService,
    private readonly tasksService: TasksService,
  ) {}

  async syncWithGoogle(userId: string, googleAccessToken: string): Promise<void> {
    // Verificar que el token sea válido
    const url = 'https://www.googleapis.com/oauth2/v3/tokeninfo';
    const params = { access_token: googleAccessToken };

    try {
      await lastValueFrom(this.httpService.get(url, { params }));
    } catch (error) {
      throw new UnauthorizedException('Invalid Google access token');
    }

    // Obtener las tareas del usuario
    const tasks = await this.tasksService.findAll();

    // Crear eventos en Google Calendar
    for (const task of tasks) {
      const event = {
        summary: task.title,
        description: task.description,
        start: {
          dateTime: new Date().toISOString(),
        },
        end: {
          dateTime: new Date(Date.now() + 3600 * 1000).toISOString(), // 1 hora después
        },
      };

      await lastValueFrom(
        this.httpService.post('https://www.googleapis.com/calendar/v3/calendars/primary/events', event, {
          headers: {
            Authorization: `Bearer ${googleAccessToken}`,
            'Content-Type': 'application/json',
          },
        }),
      );
    }
  }
}