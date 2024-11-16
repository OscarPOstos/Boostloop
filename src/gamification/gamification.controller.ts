import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Gamification')
@ApiBearerAuth()
@Controller('gamification')
@UseGuards(JwtAuthGuard)
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('points')
  @ApiOkResponse({
    description: 'Devuelve el total de puntos del usuario.',
    schema: { example: { points: 75 } },
  })
  async getUserPoints(@Req() req): Promise<{ points: number }> {
    const points = await this.gamificationService.getUserPoints(req.user.userId);
    return { points };
  }

  @Get('badges')
  @ApiOkResponse({
    description: 'Devuelve las medallas obtenidas por el usuario.',
    schema: { example: { badges: ['Buen Comienzo', 'Maestro del Tiempo'] } },
  })
  async getUserBadges(@Req() req): Promise<{ badges: string[] }> {
    const badges = await this.gamificationService.getUserBadges(req.user.userId);
    return { badges };
  }
}