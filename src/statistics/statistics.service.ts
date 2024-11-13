import { Injectable } from '@nestjs/common';
import { TimeTrackingService } from '../time-tracking/time-tracking.service';
import { format, startOfDay, endOfDay, startOfWeek, endOfWeek } from 'date-fns';

@Injectable()
export class StatisticsService {
  constructor(private readonly timeTrackingService: TimeTrackingService) {}

  async getDailyStatistics(userId: string) {
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const sessions = await this.timeTrackingService.getSessionsForPeriod(userId, todayStart, todayEnd);

    const totalHours = sessions.reduce((acc, session) => acc + session.duration, 0);

    return {
      date: format(new Date(), 'yyyy-MM-dd'),
      totalHours,
      sessionsCount: sessions.length,
    };
  }

  async getWeeklyStatistics(userId: string) {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });

    const sessions = await this.timeTrackingService.getSessionsForPeriod(userId, weekStart, weekEnd);

    const totalHours = sessions.reduce((acc, session) => acc + session.duration, 0);

    return {
      week: `${format(weekStart, 'yyyy-MM-dd')} - ${format(weekEnd, 'yyyy-MM-dd')}`,
      totalHours,
      sessionsCount: sessions.length,
    };
  }
}
