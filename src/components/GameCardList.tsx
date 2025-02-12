'use client';

import { Loader } from 'lucide-react';

import useFetchGames from '~/hooks/useFetchGames';
import { cn } from '~/lib/utils';

import GameCard from './GameCard';

type Props = { className?: string };
export default function GameCardList({ className }: Props) {
  const { games, isLoading } = useFetchGames();

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="animate-spin" size={36} />
      </div>
    );

  return (
    <ul
      className={cn(
        'grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8',
        className,
      )}
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
  );
}
