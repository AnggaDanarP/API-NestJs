import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsEmpty,
  IsDateString,
} from 'class-validator';
import { Horoscope } from '../schemas/profile.schema';
import { Zodiac } from '../schemas/profile.schema';
import { Gender } from '../schemas/profile.schema';
import { User } from 'src/api/schemas/user.schema';

export class ProfileDto {
  @IsEmpty({ message: 'You cannot pass user id' })
  user: User['_id'];

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEnum(Gender, { message: 'Please input correct category' })
  readonly gender: Gender;

  @IsNotEmpty()
  @IsDateString()
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
