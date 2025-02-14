'use client';

import { Loader } from 'lucide-react';

import useFetchGames from '~/hooks/useFetchGames';
import useScrollShadow from '~/hooks/useScrollShadow';
import { cn } from '~/lib/utils';

import GameCard from './GameCard';

type Props = { className?: string };
export default function GameCardList({ className }: Props) {
  const { games, isLoading } = useFetchGames();

  const { containerRef, handleScroll, isAtBottom } = useScrollShadow();

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="animate-spin" size={36} />
      </div>
    );

  return (
    <>
      <ul
        className={cn(
          'relative grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] gap-8',
          className,
        )}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {games && games.length > 0 ? (
          games.map((game) => (
            <li key={game.id}>
              <GameCard className="aspect-[16_/_9] shadow" {...game} />
            </li>
          ))
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            Nothing here...
          </div>
        )}
      </ul>
      {!isAtBottom && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      )}
    </>
  );
}
