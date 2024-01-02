import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Zodiac {
  Aries = 'Aries',
  Taurus = 'Taurus',
  Gemini = 'Gemini',
  Cancer = 'Cancer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpio = 'Scorpio',
  Sagittarius = 'Sagittarius',
  Capricorn = 'Capricorn',
  Aquarius = 'Aquarius',
  Pisces = 'Pisces',
  Unknown = 'Unknown',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: [true, 'Duplicate email'] })
  email: string;

  @Prop({ unique: [true, 'Username already used'] })
  name: string;

  @Prop()
  password: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: string;

  @Prop()
  horoscope: string;

  @Prop()
  zodiac: Zodiac;

  @Prop()
  height: string;

  @Prop()
  wight: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
