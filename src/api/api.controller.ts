import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  // UseGuards,
} from '@nestjs/common';
import { ApiService } from './api.service';
import { RegisterDto } from '../api/dto/register.dto';
import { LoginDto } from '../api/dto/login.dto';
import { ProfileDto } from './dto/profile.dto';
import { CreateProfileDto } from './dto/createProfile.dto';
// import { AuthGuard } from '@nestjs/passport';

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

  @Post('/createProfile')
  async createProfile(
    @Req() req: Request,
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<ProfileDto> {
    try {
      return await this.apiService.createProfile(
        createProfileDto as any,
        req as any,
      );
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Get('/getProfile')
  // @UseGuards(AuthGuard())
  getProfile(@Req() req: Request): Promise<ProfileDto> {
    return this.apiService.getProfile(req as any);
  }
}
