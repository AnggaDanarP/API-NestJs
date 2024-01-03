import {
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from '../schemas/user.schema';

export class UpdateProfileDto {
  @IsEmpty({ message: 'You cannot pass user id' })
  user: User;

  @IsNotEmpty()
  @IsString()
  readonly gender: string;

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
