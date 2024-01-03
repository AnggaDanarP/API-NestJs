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

    const { gender, birthday, height, weight } = createProfileDto;

    const setObjectbirthday = new Date(birthday);
    const setHoroscope = getChineseZodiac(setObjectbirthday);
    const setZodiac = getWesternZodiac(setObjectbirthday);
    const heightWithUnit = `${height} cm`;
    const weightWithUnit = `${weight} kg`;

    const createUser = await this.profileModel.create(
      { name: existingUser.name },
      {
        gender: gender,
        birthday: birthday,
        horoscope: setHoroscope,
        zodiac: setZodiac,
        height: heightWithUnit,
        weight: weightWithUnit,
      },
    );

    if (!createUser) {
      throw new Error('Error updating user profile');
    }
    return createUser as unknown as ProfileDto;
  }

  // !TODO: still need update for retrive the data
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

    const getUser = await this.userModel.findById(userId);
    const user = await this.profileModel.findOne({ name: getUser.name });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user as unknown as ProfileDto;
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
