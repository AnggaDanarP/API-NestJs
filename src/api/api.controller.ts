import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { RegisterDto } from '../api/dto/register.dto';
import { LoginDto } from '../api/dto/login.dto';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto): Promise<{ token: string }> {
    return this.apiService.register(registerDto);
  }

  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.apiService.login(loginDto);
  }
}
