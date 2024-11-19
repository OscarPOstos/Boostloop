import { Test, TestingModule } from '@nestjs/testing';
import { CalendarSyncController } from './calendar-sync.controller';

describe('CalendarSyncController', () => {
  let controller: CalendarSyncController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarSyncController],
    }).compile();

    controller = module.get<CalendarSyncController>(CalendarSyncController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
