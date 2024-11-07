import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class StopTrackingDto {
  @ApiProperty({
    description: 'ID de la sesión de tiempo que se desea detener',
    example: 'b34c5d6e-7890-41de-b7c6-f4f9e8ad7d1e'
  })
  @IsUUID()
  @IsNotEmpty()
  sessionId: string;
}