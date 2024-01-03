import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../api/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/createProfile.dto';
import { ProfileDto } from './dto/profile.dto';
import { getWesternZodiac } from '../profile/utils/zodiac.utils';
import { getChineseZodiac } from '../profile/utils/horoscope.utils';
import { Profile } from './schemas/profile.schema';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private profileModel: Model<Profile>,
  ) {}

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
    user: User,
    updateProfileDto: UpdateProfileDto,
  ): Promise<ProfileDto> {
    const existingProfile = await this.profileModel.findOne({ user: user._id });
    if (!existingProfile) {
      throw new Error('Please create your profile');
    }

    const { gender, birthday, height, weight } = updateProfileDto;

    const setObjectbirthday = new Date(updateProfileDto.birthday);
    const setHoroscope = getChineseZodiac(setObjectbirthday);
    const setZodiac = getWesternZodiac(setObjectbirthday);
    const heightWithUnit = `${height} cm`;
    const weightWithUnit = `${weight} kg`;

    const updatedUser = await this.profileModel.findOneAndUpdate(
      user._id,
      {
        gender,
        birthday,
        horoscope: setHoroscope,
        zodiac: setZodiac,
        height: heightWithUnit,
        weight: weightWithUnit,
      },
      {
        new: true,
        runValidator: true,
      },
    );

    if (!updatedUser) {
      throw new Error('Error updating user profile');
    }
    return updatedUser as unknown as ProfileDto;
  }
}
