import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'Correo electrónico único del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Doe', description: 'Nombre completo del usuario' })
  @IsNotEmpty()
  name: string;
}