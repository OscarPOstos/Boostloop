import { Test, TestingModule } from '@nestjs/testing';
import { CalendarSyncService } from './calendar-sync.service';

describe('CalendarSyncService', () => {
  let service: CalendarSyncService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendarSyncService],
    }).compile();

    service = module.get<CalendarSyncService>(CalendarSyncService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
