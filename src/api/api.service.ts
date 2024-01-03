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
import { Profile } from './schemas/profile.schema';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Injectable()
export class ApiService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    @InjectModel(Profile.name)
    private profileModel: Model<Profile>,
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
    createProfileDto: CreateProfileDto,
    user: User,
  ): Promise<ProfileDto> {
    const existingProfile = await this.profileModel.findOne({ user: user._id });
    if (existingProfile) {
      throw new Error('User already has a profile');
    }

    const { gender, birthday, height, weight } = createProfileDto;

    const setObjectbirthday = new Date(birthday);
    const setHoroscope = getChineseZodiac(setObjectbirthday);
    const setZodiac = getWesternZodiac(setObjectbirthday);
    const heightWithUnit = `${height} cm`;
    const weightWithUnit = `${weight} kg`;

    try {
      const profile = await this.profileModel.create({
        user: user._id,
        gender,
        birthday,
        horoscope: setHoroscope,
        zodiac: setZodiac,
        height: heightWithUnit,
        weight: weightWithUnit,
      });

      return profile as unknown as ProfileDto;
    } catch (error) {
      throw new Error('Error creating user profile: ' + error.message);
    }
  }

  async getProfile(user: User): Promise<ProfileDto> {
    const existingProfile = await this.profileModel.findOne({ user: user._id });
    if (!existingProfile) {
      throw new Error('Please create your profile');
    }

    const userProfile = await this.profileModel.findOne(user._id);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return userProfile as unknown as ProfileDto;
  }

  async updateProfile(
    @Req() req: Request,
    updateProfileDto: UpdateProfileDto,
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

    const birthday = new Date(updateProfileDto.birthday);
    const horoscope = getChineseZodiac(birthday);
    const zodiac = getWesternZodiac(birthday);
    const heightWithUnit = `${updateProfileDto.height} cm`;
    const weightWithUnit = `${updateProfileDto.weight} kg`;

    const updatedUser = await this.profileModel.findOneAndUpdate(
      { name: existingUser.name },
      {
        ...updateProfileDto,
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
    return updatedUser as unknown as ProfileDto;
  }
}
