import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Statistics')
@ApiBearerAuth()
@Controller('statistics')
@UseGuards(JwtAuthGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('daily')
  @ApiOperation({ summary: 'Obtener estadísticas diarias' })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas diarias obtenidas correctamente',
    schema: {
      example: {
        date: '2023-11-03',
        totalHours: 5,
        sessionsCount: 3,
      },
    },
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getDailyStatistics(@Req() req) {
    return this.statisticsService.getDailyStatistics(req.user.userId);
  }

  @Get('weekly')
  @ApiOperation({ summary: 'Obtener estadísticas semanales' })
  @ApiResponse({
    status: 200,
    description: 'Estadísticas semanales obtenidas correctamente',
    schema: {
      example: {
        week: '2023-10-30 - 2023-11-05',
        totalHours: 20,
        sessionsCount: 10,
      },
    },
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getWeeklyStatistics(@Req() req) {
    return this.statisticsService.getWeeklyStatistics(req.user.userId);
  }
}
