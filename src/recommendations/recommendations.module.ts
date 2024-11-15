import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { TimeTrackingModule } from '../time-tracking/time-tracking.module';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [TimeTrackingModule, TasksModule],
  providers: [RecommendationsService],
  controllers: [RecommendationsController],
})
export class RecommendationsModule {}
