import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
  // UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
import { CreateProfileDto } from './dto/createProfile.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileDto } from './dto/updateProfile.dto';
// import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post('/createProfile')
  @UseGuards(AuthGuard())
  async createProfile(
    @Req() req: Request,
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<ProfileDto> {
    try {
      return await this.profileService.createProfile(
        createProfileDto as any,
        req as any,
      );
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  @Get('/getProfile')
  @UseGuards(AuthGuard())
  getProfile(@Req() req: Request): Promise<ProfileDto> {
    return this.profileService.getProfile(req as any);
  }

  @Put('/updateProfile')
  async updateProfile(
    @Req() req: Request,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileDto> {
    return this.profileService.updateProfile(req as any, updateProfileDto);
  }
}
