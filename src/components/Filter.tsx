'use client';

import useFilter from '~/hooks/useFilter';
import { cn } from '~/lib/utils';

type Filter = {
  displayText: string;
  value: string;
};

const dateFilters: Filter[] = [
  { displayText: 'All Time', value: 'all time' },
  { displayText: 'Year', value: 'year' },
  { displayText: 'Month', value: 'month' },
  { displayText: 'Week', value: 'week' },
];

const filters: Filter[] = [
  { displayText: 'Popularity', value: 'metacritic' },
  { displayText: 'Released', value: 'released' },
  { displayText: 'Rating', value: 'rating' },
  { displayText: 'Name', value: 'name' },
];

type Props = {
  className?: string;
};
export default function Filter({ className }: Props) {
  const { handleFilterChange, params } = useFilter();

  const { date, ordering } = params;

  return (
    <header
      className={cn(
        'space-y-4 bg-slate-950 md:space-x-4 md:space-y-0',
        className,
      )}
    >
      <select
        className="w-full min-w-32 cursor-pointer rounded-lg border border-white bg-slate-950 p-4 text-white md:w-fit"
        value={date ?? 'all time'}
        onChange={(e) => handleFilterChange('date', e.target.value)}
      >
        {dateFilters.map(({ displayText, value }) => (
          <option key={value} value={value}>
            {displayText}
          </option>
        ))}
      </select>
      <select
        className="w-full min-w-32 cursor-pointer rounded-lg border border-white bg-slate-950 p-4 text-white md:w-fit"
        value={ordering ?? 'metacritic'}
        onChange={(e) => handleFilterChange('sort', e.target.value)}
      >
        {filters.map(({ displayText, value }) => (
          <option key={value} value={value}>
            {displayText}
          </option>
        ))}
      </select>
    </header>
  );
}
