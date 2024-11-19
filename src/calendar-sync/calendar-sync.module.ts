import { Module } from '@nestjs/common';
import { CalendarSyncService } from './calendar-sync.service';
import { CalendarSyncController } from './calendar-sync.controller';
import { HttpModule } from '@nestjs/axios';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [HttpModule, TasksModule],
  providers: [CalendarSyncService],
  controllers: [CalendarSyncController],
})
export class CalendarSyncModule {}