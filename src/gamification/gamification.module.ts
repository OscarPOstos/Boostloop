import { Module } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { GamificationController } from './gamification.controller';
import { TasksModule } from '../tasks/tasks.module';
import { TimeTrackingModule } from '../time-tracking/time-tracking.module';

@Module({
  imports: [TasksModule, TimeTrackingModule],
  providers: [GamificationService],
  controllers: [GamificationController],
})
export class GamificationModule {}