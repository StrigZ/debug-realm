import { Loader } from 'lucide-react';

import { cn } from '~/lib/utils';
import type { Genre, UrlParams } from '~/types';

type Props = {
  genres: Genre[];
  isLoading: boolean;
  className?: string;
  handleFilterChange: (param: UrlParams, value: string) => void;
  activeGenre: string | null;
};
export default function Sidebar({
  className,
  handleFilterChange,
  genres,
  isLoading,
  activeGenre,
}: Props) {
  if (isLoading) return <Loader className="mx-auto animate-spin" size={128} />;

  return (
    <nav className={cn('space-y-4', className)}>
      <h2 className="sticky top-0 bg-slate-950 p-4 pt-0 text-3xl font-bold shadow">
        Genres
      </h2>
      <ul className="space-y-1">
        {genres.map((genre) => (
          <li key={genre.id} className="flex gap-4">
            <button
              className={cn(
                'w-full rounded px-4 py-2 text-left text-lg transition-colors hover:bg-slate-600 active:scale-95',
                { 'bg-slate-600': activeGenre === genre.slug },
              )}
              onClick={() => handleFilterChange('genres', genre.slug)}
            >
              {genre.name === 'Massively Multiplayer' ? 'MMO' : genre.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
