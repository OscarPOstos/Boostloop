import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';

@ApiTags('Recommendations')
@ApiBearerAuth()
@Controller('recommendations')
@UseGuards(JwtAuthGuard)
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Get()
  @ApiOkResponse({
    description: 'Devuelve una lista de recomendaciones personalizadas basadas en los hábitos del usuario.',
    schema: {
      example: [
        'Comienza una nueva sesión de trabajo para mantener tu productividad.',
        'Intenta dedicar al menos 1 hora diaria para alcanzar tus metas.',
        'Tienes 3 tareas pendientes. Prioriza las más importantes.',
      ],
    },
  })
  async getRecommendations(@Req() req) {
    return this.recommendationsService.getRecommendations(req.user.userId);
  }
}
