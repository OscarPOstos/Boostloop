import { Controller, Post, Req, UseGuards, Body } from '@nestjs/common';
import { CalendarSyncService } from './calendar-sync.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiBody, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Calendar Sync')
@ApiBearerAuth()
@Controller('calendar-sync')
@UseGuards(JwtAuthGuard)
export class CalendarSyncController {
  constructor(private readonly calendarSyncService: CalendarSyncService) {}

  @Post('google-sync')
  @ApiBody({
    description: 'Proporciona el token de acceso de Google para sincronización.',
    schema: {
      example: {
        googleAccessToken: 'ya29.a0Ae6...',
      },
    },
  })
  @ApiOkResponse({ description: 'Sincronización exitosa con Google Calendar.' })
  async syncWithGoogle(@Req() req, @Body('googleAccessToken') googleAccessToken: string): Promise<{ message: string }> {
    await this.calendarSyncService.syncWithGoogle(req.user.userId, googleAccessToken);
    return { message: 'Sincronización exitosa con Google Calendar' };
  }
}
