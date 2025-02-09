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
      )}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
          <Loader className="animate-spin" size={108} />
        </div>
      ) : (
        games.map((game) => (
          <li key={game.id}>
            <GameCard
              className="aspect-[16_/_9] shadow transition-transform hover:-translate-y-1"
              {...game}
            />
          </li>
        ))
      )}
    </ul>
  );
}
