'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import useFilter from '~/hooks/useFilter';
import { getGenres } from '~/lib/get-genres';
import { cn } from '~/lib/utils';

import type { SidebarProps } from './types';

export default function SidebarContent({ className }: SidebarProps) {
  const { data: genres } = useSuspenseQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });
  const { handleFilterChange, params } = useFilter();
  const { genre: activeGenre } = params;

  return (
    <nav
      className={cn(
        'relative flex h-full flex-col gap-8 overflow-hidden md:pb-4',
        className,
      )}
    >
      <h2 className="hidden bg-slate-950 p-4 pt-0 text-3xl font-bold shadow md:inline">
        Genres
      </h2>
      <ul className={cn('space-y-1 overflow-y-auto')}>
        {genres.map((genre) => (
          <li key={genre.id} className="flex gap-4">
            <button
              className={cn(
                'w-full rounded px-4 py-2 text-left text-lg transition-colors hover:bg-slate-600 active:scale-95',
                { 'bg-slate-600': activeGenre === genre.slug },
              )}
              onClick={() => handleFilterChange('genre', genre.slug)}
            >
              {genre.name === 'Massively Multiplayer' ? 'MMO' : genre.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
