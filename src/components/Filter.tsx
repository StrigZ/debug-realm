import { cn } from '~/utils/utils';

const dateFilters: {
  displayText: string;
}[] = [
  { displayText: 'Today' },
  { displayText: 'Week' },
  { displayText: 'Month' },
  { displayText: 'Year' },
  { displayText: 'All Time' },
];

const filters: {
  displayText: string;
  value: string;
}[] = [
  { displayText: 'Name', value: 'name' },
  { displayText: 'Rating', value: 'rating' },
  { displayText: 'Released', value: 'released' },
  { displayText: 'Popularity', value: 'metacritic' },
];

type Props = { classNames?: string };
export default function Filter({ classNames }: Props) {
  return (
    <header className={cn('space-x-4 bg-slate-950 pb-4', classNames)}>
      <select
        className="cursor-pointer rounded-lg border border-white bg-slate-950 p-4 text-white"
        defaultValue="All Time"
      >
        {dateFilters.map(({ displayText }) => (
          <option key={displayText} value={displayText}>
            {displayText}
          </option>
        ))}
      </select>
      <select
        className="cursor-pointer rounded-lg border border-white bg-slate-950 p-4 text-white"
        defaultValue="metacritic"
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
