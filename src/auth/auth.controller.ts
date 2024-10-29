import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('auth') // Categoría en Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registro de nuevos usuarios' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @ApiOperation({ summary: 'Inicio de sesión de usuarios' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto.email, loginUserDto.password);
  }
}
