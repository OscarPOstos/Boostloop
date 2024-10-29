import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Correo electrónico del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
  @IsNotEmpty()
  password: string;
}