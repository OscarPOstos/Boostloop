import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);
    const user = await this.userService.create({
      ...registerUserDto,
      password: hashedPassword,
    });
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}