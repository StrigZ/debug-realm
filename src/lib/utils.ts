import { type ClassValue, clsx } from 'clsx';
import { format, subMonths, subWeeks, subYears } from 'date-fns';
import { twMerge } from 'tailwind-merge';

import type { UrlParamsDatesValue } from '~/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDatesParamString(param: UrlParamsDatesValue) {
  const today = new Date();
  const formattedToday = format(today, 'yyyy-MM-dd');

  const oneWeekAgo = subWeeks(today, 1);
  const oneMonthAgo = subMonths(today, 1);
  const oneYearAgo = subYears(today, 1);

  switch (param) {
    case 'week':
      const formattedOneWeekAgo = format(oneWeekAgo, 'yyyy-MM-dd');
      return `${formattedOneWeekAgo},${formattedToday}`;
    case 'month':
      const formattedOneMonthAgo = format(oneMonthAgo, 'yyyy-MM-dd');
      return `${formattedOneMonthAgo},${formattedToday}`;
    case 'year':
      const formattedOneYearAgo = format(oneYearAgo, 'yyyy-MM-dd');
      return `${formattedOneYearAgo},${formattedToday}`;
  }
}
