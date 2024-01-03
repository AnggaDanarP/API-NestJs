import {
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
} from 'class-validator';
import { User } from 'src/api/schemas/user.schema';
import { Gender } from '../schemas/profile.schema';

export class CreateProfileDto {
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
  readonly birthday: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly height: number;

  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;
}
