import { Horoscope } from '../schemas/profile.schema';

const horoscope = [
  Horoscope.Rat,
  Horoscope.Ox,
  Horoscope.Tiger,
  Horoscope.Rabbit,
  Horoscope.Dragon,
  Horoscope.Snake,
  Horoscope.Horse,
  Horoscope.Goat,
  Horoscope.Monkey,
  Horoscope.Rooster,
  Horoscope.Dog,
  Horoscope.Pig,
];

export function getChineseZodiac(date: Date): string {
  let year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Adjust the year if the date is before February 1st
  if (month < 2 || (month === 2 && day < 1)) {
    year -= 1;
  }

  const zodiacIndex = (year - 4) % 12; // 4 is the base year for Rat
  return horoscope[zodiacIndex];
}
