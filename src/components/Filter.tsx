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
    <header
      className={cn(
        'flex items-center justify-between bg-slate-950 pb-4',
        classNames,
      )}
    >
      <h1 className="text-4xl font-bold">Top Selling</h1>
      <div className="space-x-4">
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
      </div>
    </header>
  );
}
