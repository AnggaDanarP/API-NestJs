import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Horoscope } from '../schemas/profile.schema';
import { Zodiac } from '../schemas/profile.schema';

export class ProfileDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly gender: string;

  @IsNotEmpty()
  @IsString()
  readonly birthday: string;

  @IsNotEmpty()
  @IsEnum(Horoscope, { message: 'Please input correct category' })
  readonly horoscope: Horoscope;

  @IsNotEmpty()
  @IsEnum(Zodiac, { message: 'Please input correct category' })
  readonly zodiac: Zodiac;

  @IsNotEmpty()
  @IsString()
  readonly height: string;

  @IsNotEmpty()
  @IsString()
  readonly weight: string;
}
