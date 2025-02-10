import { cn } from '~/lib/utils';
import type {
  UrlParams,
  UrlParamsDatesValue,
  UrlParamsSortValue,
} from '~/types';

type Filter = {
  displayText: string;
  value: string;
};

const dateFilters: Filter[] = [
  { displayText: 'Week', value: 'week' },
  { displayText: 'Month', value: 'month' },
  { displayText: 'Year', value: 'year' },
  { displayText: 'All Time', value: 'all time' },
];

const filters: Filter[] = [
  { displayText: 'Name', value: 'name' },
  { displayText: 'Rating', value: 'rating' },
  { displayText: 'Released', value: 'released' },
  { displayText: 'Popularity', value: 'metacritic' },
];

type Props = {
  date: UrlParamsDatesValue;
  ordering: UrlParamsSortValue;
  className?: string;
  handleFilterChange: (param: UrlParams, value: string) => void;
};
export default function Filter({
  className,
  handleFilterChange,
  date,
  ordering,
}: Props) {
  return (
    <header
      className={cn(
        'space-y-4 bg-slate-950 md:space-x-4 md:space-y-0',
        className,
      )}
    >
      <select
        className="w-full cursor-pointer rounded-lg border border-white bg-slate-950 p-4 text-white md:w-fit"
        value={date}
        onChange={(e) => handleFilterChange('date', e.target.value)}
      >
        {dateFilters.map(({ displayText, value }) => (
          <option key={value} value={value}>
            {displayText}
          </option>
        ))}
      </select>
      <select
        className="w-full cursor-pointer rounded-lg border border-white bg-slate-950 p-4 text-white md:w-fit"
        value={ordering}
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
