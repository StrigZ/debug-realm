'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import useFilter from '~/hooks/useFilter';
import useScrollShadow from '~/hooks/useScrollShadow';
import { getGenres } from '~/lib/get-genres';
import { cn } from '~/lib/utils';

import type { SidebarProps } from './types';

export default function SidebarContent({
  className,
  onFilterSelect,
}: SidebarProps) {
  const { data: genres } = useSuspenseQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });
  const { handleFilterChange, params } = useFilter();
  const { genre: activeGenre } = params;

  const { containerRef, handleScroll, isAtBottom } = useScrollShadow();

  return (
    <nav
      className={cn(
        'relative flex h-full flex-col gap-8 overflow-hidden',
        className,
      )}
    >
      <h2 className="hidden bg-slate-950 p-4 pt-0 text-3xl font-bold shadow md:inline">
        Genres
      </h2>

      <ul
        className={cn('space-y-1 overflow-y-auto')}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {genres.map((genre) => (
          <li key={genre.id} className="flex gap-4">
            <button
              className={cn(
                'w-full rounded px-4 py-2 text-left text-lg transition-colors hover:bg-slate-600 active:scale-95',
                { 'bg-slate-600': activeGenre === genre.slug },
              )}
              onClick={() => {
                handleFilterChange('genre', genre.slug);
                onFilterSelect?.();
              }}
            >
              {genre.name === 'Massively Multiplayer' ? 'MMO' : genre.name}
            </button>
          </li>
        ))}
      </ul>
      {!isAtBottom && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      )}
    </nav>
  );
}
