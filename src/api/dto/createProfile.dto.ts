import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProfileDto {
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
  @IsNumber()
  readonly height: number;

  @IsNotEmpty()
  @IsNumber()
  readonly weight: number;
}
