import { Zodiac } from '../schemas/user.schema';

const zodiacSigns = [
  { sign: Zodiac.Aries, start: '03-21', end: '04-19' },
  { sign: Zodiac.Taurus, start: '04-20', end: '05-20' },
  { sign: Zodiac.Gemini, start: '05-21', end: '06-20' },
  { sign: Zodiac.Cancer, start: '06-21', end: '07-22' },
  { sign: Zodiac.Leo, start: '07-23', end: '08-22' },
  { sign: Zodiac.Virgo, start: '08-23', end: '09-22' },
  { sign: Zodiac.Libra, start: '09-23', end: '10-22' },
  { sign: Zodiac.Scorpio, start: '10-23', end: '11-21' },
  { sign: Zodiac.Sagittarius, start: '11-22', end: '12-21' },
  { sign: Zodiac.Capricorn, start: '12-22', end: '01-19' },
  { sign: Zodiac.Aquarius, start: '01-20', end: '02-18' },
  { sign: Zodiac.Pisces, start: '02-19', end: '03-20' },
];

export function getWesternZodiac(date: Date): string {
  const month = date.getMonth() + 1; // JavaScript months are 0-indexed
  const day = date.getDate();
  const formattedDate = `${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`;

  for (const zodiac of zodiacSigns) {
    if (
      (formattedDate >= zodiac.start && formattedDate <= '12-31') ||
      (formattedDate >= '01-01' && formattedDate <= zodiac.end)
    ) {
      return zodiac.sign;
    }
  }

  return 'Unknown';
}
