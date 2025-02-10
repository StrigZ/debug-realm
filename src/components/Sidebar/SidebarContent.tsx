import { Loader } from 'lucide-react';

import { cn } from '~/lib/utils';

import type { SidebarProps } from './types';

export default function SidebarContent({
  className,
  handleFilterChange,
  genres,
  isLoading,
  activeGenre,
}: SidebarProps) {
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
      <ul
        className={cn('space-y-1 overflow-y-auto', {
          'flex items-center justify-center': isLoading,
        })}
      >
        {isLoading ? (
          <div className="absolute inset-0 flex h-full w-full items-center justify-center">
            <Loader className="animate-spin" size={36} />
          </div>
        ) : (
          genres.map((genre) => (
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
          ))
        )}
      </ul>
    </nav>
  );
}
