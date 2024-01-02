import { Zodiac } from '../schemas/user.schema';

export function getZodiac(date: Date): Zodiac {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  switch (month) {
    case 1:
      return day <= 19 ? Zodiac.Capricorn : Zodiac.Aquarius;
    case 2:
      return day <= 18 ? Zodiac.Aquarius : Zodiac.Pisces;
    case 3:
      return day <= 20 ? Zodiac.Pisces : Zodiac.Aries;
    case 4:
      return day <= 19 ? Zodiac.Aries : Zodiac.Taurus;
    case 5:
      return day <= 20 ? Zodiac.Taurus : Zodiac.Gemini;
    case 6:
      return day <= 20 ? Zodiac.Gemini : Zodiac.Cancer;
    case 7:
      return day <= 22 ? Zodiac.Cancer : Zodiac.Leo;
    case 8:
      return day <= 22 ? Zodiac.Leo : Zodiac.Virgo;
    case 9:
      return day <= 22 ? Zodiac.Virgo : Zodiac.Libra;
    case 10:
      return day <= 22 ? Zodiac.Libra : Zodiac.Scorpio;
    case 11:
      return day <= 21 ? Zodiac.Scorpio : Zodiac.Sagittarius;
    case 12:
      return day <= 21 ? Zodiac.Sagittarius : Zodiac.Capricorn;
    default:
      return Zodiac.Unknown;
  }
}
