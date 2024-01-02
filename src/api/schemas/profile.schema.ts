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
  Sagitarius = 'Sagitarius',
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
  timestamps: true, // This will automatically add createdAt and updatedAt fields
})
export class Profile {
  @Prop({ required: true, unique: true, ref: 'User' })
  name: string;

  @Prop()
  gender: string;

  @Prop()
  birthday: string;

  @Prop({ enum: Horoscope })
  horoscope: Horoscope;

  @Prop({ enum: Zodiac })
  zodiac: Zodiac;

  @Prop()
  height: string;

  @Prop()
  weight: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
