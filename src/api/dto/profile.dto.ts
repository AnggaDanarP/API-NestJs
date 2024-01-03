import { IsNotEmpty, IsString, IsEnum, IsEmpty } from 'class-validator';
import { Horoscope } from '../schemas/profile.schema';
import { Zodiac } from '../schemas/profile.schema';
import { User } from '../schemas/user.schema';

export class ProfileDto {
  @IsEmpty({ message: 'You cannot pass user id' })
  user: User;

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
