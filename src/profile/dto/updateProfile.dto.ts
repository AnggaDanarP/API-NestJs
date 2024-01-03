import {
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { User } from 'src/api/schemas/user.schema';
import { Gender } from '../schemas/profile.schema';

export class UpdateProfileDto {
  @IsEmpty({ message: 'You cannot pass user id' })
  user: User;

  @IsNotEmpty()
  @IsEnum(Gender, { message: 'Please input correct category' })
  readonly gender: Gender;

  @IsNotEmpty()
  @IsDateString()
  readonly birthday: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly height: number;

  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;
}
