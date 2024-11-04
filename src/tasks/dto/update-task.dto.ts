import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({ description: 'Título de la tarea', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Descripción de la tarea', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
