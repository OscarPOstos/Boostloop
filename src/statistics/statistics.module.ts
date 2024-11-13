import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TimeTrackingModule } from '../time-tracking/time-tracking.module';

@Module({
  imports: [TimeTrackingModule],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
