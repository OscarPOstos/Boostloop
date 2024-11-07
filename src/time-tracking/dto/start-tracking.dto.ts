import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class StartTrackingDto {
  @ApiProperty({
    description: 'ID de la tarea para la cual se inicia el registro de tiempo',
    example: '2'
  })
  @IsUUID()
  @IsNotEmpty()
  taskId: string;
}