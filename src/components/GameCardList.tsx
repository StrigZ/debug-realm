import { Loader } from 'lucide-react';

import { cn } from '~/lib/utils';
import { type Game } from '~/types';

import GameCard from './GameCard';

type Props = { className?: string; games: Game[]; isLoading: boolean };
export default function GameCardList({ className, games, isLoading }: Props) {
  return (
    <ul
      className={cn(
        'grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8',
        className,
        {
          'flex items-center justify-center': isLoading,
        },
      )}
    >
      {isLoading ? (
        <Loader className="animate-spin" size={36} />
      ) : (
        games.map((game) => (
          <li key={game.id}>
            <GameCard className="aspect-[16_/_9] shadow" {...game} />
          </li>
        ))
      )}
    </ul>
  );
}
