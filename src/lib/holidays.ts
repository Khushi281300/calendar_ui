import { format } from 'date-fns';

export const INDIAN_HOLIDAYS_2026: Record<string, string> = {
  '2026-01-26': 'Republic Day',
  '2026-03-03': 'Holi',
  '2026-03-20': 'Eid-ul-Fitr', // Approx
  '2026-04-10': 'Good Friday',
  '2026-08-15': 'Independence Day',
  '2026-08-27': 'Raksha Bandhan', // Approx
  '2026-10-02': 'Gandhi Jayanti',
  '2026-10-20': 'Dussehra', // Approx
  '2026-11-08': 'Diwali', // Approx
  '2026-12-25': 'Christmas',
};

export function getHoliday(date: Date): string | undefined {
  const dateKey = format(date, 'yyyy-MM-dd');
  return INDIAN_HOLIDAYS_2026[dateKey];
}
