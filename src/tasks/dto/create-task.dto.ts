import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'Título de la tarea' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Descripción de la tarea' })
  @IsOptional()
  @IsString()
  description?: string;
}