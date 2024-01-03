import { Zodiac } from '../schemas/profile.schema';

const zodiacSigns = [
  {
    sign: Zodiac.Capricorn,
    start: { month: 12, day: 22 },
    end: { month: 1, day: 19 },
  },
  {
    sign: Zodiac.Aquarius,
    start: { month: 1, day: 20 },
    end: { month: 2, day: 18 },
  },
  {
    sign: Zodiac.Pisces,
    start: { month: 2, day: 19 },
    end: { month: 3, day: 20 },
  },
  {
    sign: Zodiac.Aries,
    start: { month: 3, day: 21 },
    end: { month: 4, day: 19 },
  },
  {
    sign: Zodiac.Taurus,
    start: { month: 4, day: 20 },
    end: { month: 5, day: 20 },
  },
  {
    sign: Zodiac.Gemini,
    start: { month: 5, day: 21 },
    end: { month: 6, day: 20 },
  },
  {
    sign: Zodiac.Cancer,
    start: { month: 6, day: 21 },
    end: { month: 7, day: 22 },
  },
  {
    sign: Zodiac.Leo,
    start: { month: 7, day: 23 },
    end: { month: 8, day: 22 },
  },
  {
    sign: Zodiac.Virgo,
    start: { month: 8, day: 23 },
    end: { month: 9, day: 22 },
  },
  {
    sign: Zodiac.Libra,
    start: { month: 9, day: 23 },
    end: { month: 10, day: 22 },
  },
  {
    sign: Zodiac.Scorpio,
    start: { month: 10, day: 23 },
    end: { month: 11, day: 21 },
  },
  {
    sign: Zodiac.Sagitarius,
    start: { month: 11, day: 22 },
    end: { month: 12, day: 21 },
  },
];

export function getWesternZodiac(date: Date): string {
  const birthMonth = date.getMonth() + 1; // JavaScript months are 0-indexed
  const birthDay = date.getDate();

  for (const zodiac of zodiacSigns) {
    const startMonth = zodiac.start.month;
    const startDay = zodiac.start.day;
    const endMonth = zodiac.end.month;
    const endDay = zodiac.end.day;

    if (
      (birthMonth === startMonth && birthDay >= startDay) ||
      (birthMonth === endMonth && birthDay <= endDay)
    ) {
      return zodiac.sign;
    }
  }

  return 'Unknown';
}
