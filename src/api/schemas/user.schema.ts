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

export enum Horoscope {
  Rat = 'Rat',
  Ox = 'Ox',
  Tiger = 'Tiger',
  Rabbit = 'Rabbit',
  Dragon = 'Dragon',
  Snake = 'Snake',
  Horse = 'Horse',
  Goat = 'Goat',
  Monkey = 'Monkey',
  Rooster = 'Rooster',
  Dog = 'Dog',
  Pig = 'Pig',
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
  horoscope: Horoscope;

  @Prop()
  zodiac: Zodiac;

  @Prop()
  height: string;

  @Prop()
  weight: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
