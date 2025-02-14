'use client';

import { Loader } from 'lucide-react';

import useFetchGames from '~/hooks/useFetchGames';
import useScrollShadow from '~/hooks/useScrollShadow';
import { cn } from '~/lib/utils';
import type { Game } from '~/types';

import GameCard from './GameCard';

type Props = { className?: string };
export default function GameCardList({ className }: Props) {
  const { data, isLoading, isLoadingMore, fetchMoreTriggerRef } =
    useFetchGames();
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
          'scrollbar-thin relative grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] gap-8 lg:pr-4',
          className,
        )}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {data?.pages.map(({ results }) =>
          results.length === 0 ? (
            <div
              key={0}
              className="absolute inset-0 flex items-center justify-center"
            >
              Nothing here...
            </div>
          ) : (
            results.map((game) => (
              <li key={(game as Game).id}>
                <GameCard
                  className="aspect-[16_/_9] shadow"
                  {...(game as Game)}
                />
              </li>
            ))
          ),
        )}
        {isLoadingMore && (
          <div className="col-span-full flex h-full w-full items-center justify-center">
            <Loader className="animate-spin" size={36} />
          </div>
        )}
        <li ref={fetchMoreTriggerRef} />
      </ul>
      {!isAtBottom && (
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-20 bg-gradient-to-t from-background to-transparent"></div>
      )}
    </>
  );
}
