import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../api/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../api/dto/register.dto';
import { LoginDto } from '../api/dto/login.dto';
import { CreateProfileDto } from './dto/createProfile.dto';
import { ProfileDto } from './dto/profile.dto';
import { getWesternZodiac } from './utils/zodiac.utils';
import { getChineseZodiac } from './utils/horoscope.utils';
import { Request } from 'express';

@Injectable()
export class ApiService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ token: string }> {
    const { email, name, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
      email,
      name,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: newUser._id });
    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const isUser = await this.userModel.findOne({ email });
    if (!isUser) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const isPasswordMatch = await bcrypt.compare(password, isUser.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const token = this.jwtService.sign({ id: isUser._id });
    return { token };
  }

  async createProfile(
    @Req() req: Request,
    createProfileDto: CreateProfileDto,
  ): Promise<ProfileDto> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    let userId: string;
    try {
      const decoded = this.jwtService.verify(token);
      userId = decoded.id;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const existingUser = await this.userModel.findOne({ _id: userId });
    if (!existingUser) {
      throw new Error('User not found');
    }

    const birthday = new Date(createProfileDto.birthday);
    const horoscope = getChineseZodiac(birthday);
    const zodiac = getWesternZodiac(birthday);
    const heightWithUnit = `${createProfileDto.height} cm`;
    const weightWithUnit = `${createProfileDto.weight} kg`;

    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        ...createProfileDto,
        horoscope: horoscope,
        zodiac: zodiac,
        height: heightWithUnit,
        weight: weightWithUnit,
      },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new Error('Error updating user profile');
    }
    return updatedUser as ProfileDto;
  }

  async getProfile(@Req() req: Request): Promise<ProfileDto> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    let userId: string;
    try {
      const decoded = this.jwtService.verify(token);
      userId = decoded.id;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const user = await this.userModel.findById(userId).select('-password');
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user as ProfileDto;
  }
}
