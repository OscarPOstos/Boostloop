import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { TimeTrackingService } from './time-tracking.service';
import { StartTrackingDto } from './dto/start-tracking.dto';
import { StopTrackingDto } from './dto/stop-tracking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Time Tracking')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('time-tracking')
export class TimeTrackingController {
  constructor(private readonly timeTrackingService: TimeTrackingService) {}

  @Post('/start')
  @ApiOperation({ summary: 'Iniciar el registro de tiempo para una tarea' })
  @ApiBody({ type: StartTrackingDto })
  @ApiResponse({
    status: 201,
    description: 'Sesión de tiempo iniciada correctamente',
    schema: {
      example: {
        sessionId: 'b34c5d6e-7890-41de-b7c6-f4f9e8ad7d1e',
        taskId: 'a12f3e4d-5678-49bc-a5a6-e2f9d5bf4c3d',
        startTime: '2023-11-03T15:00:00.000Z'
      }
    }
  })
  async startTracking(@Req() req, @Body() startTrackingDto: StartTrackingDto) {
    const userId = req.user.userId;
    return this.timeTrackingService.startTracking(userId, startTrackingDto);
  }

  @Post('/stop')
  @ApiOperation({ summary: 'Detener el registro de tiempo para una tarea' })
  @ApiBody({ type: StopTrackingDto })
  @ApiResponse({
    status: 200,
    description: 'Sesión de tiempo detenida correctamente',
    schema: {
      example: {
        sessionId: 'b34c5d6e-7890-41de-b7c6-f4f9e8ad7d1e',
        taskId: 'a12f3e4d-5678-49bc-a5a6-e2f9d5bf4c3d',
        startTime: '2023-11-03T15:00:00.000Z',
        endTime: '2023-11-03T16:00:00.000Z',
        duration: '1 hour'
      }
    }
  })
  async stopTracking(@Req() req, @Body() stopTrackingDto: StopTrackingDto) {
    const userId = req.user.userId;
    return this.timeTrackingService.stopTracking(userId, stopTrackingDto);
  }

  @Get('/')
  @ApiOperation({ summary: 'Obtener todas las sesiones de trabajo de un usuario' })
  @ApiResponse({
    status: 200,
    description: 'Lista de sesiones de trabajo obtenida correctamente',
    schema: {
      example: [
        {
          sessionId: 'b34c5d6e-7890-41de-b7c6-f4f9e8ad7d1e',
          taskId: 'a12f3e4d-5678-49bc-a5a6-e2f9d5bf4c3d',
          startTime: '2023-11-03T15:00:00.000Z',
          endTime: '2023-11-03T16:00:00.000Z',
          duration: '1 hour'
        },
        {
          sessionId: 'c45d7e8f-8901-52fe-c8d7-g5g9h8ad7i2f',
          taskId: 'b23d4f5g-6789-50ba-b7d6-f5e9h7ad8i3f',
          startTime: '2023-11-03T14:00:00.000Z',
          endTime: '2023-11-03T15:30:00.000Z',
          duration: '1 hour 30 minutes'
        }
      ]
    }
  })
  async getSessions(@Req() req) {
    const userId = req.user.userId;
    return this.timeTrackingService.getSessions(userId);
  }
}