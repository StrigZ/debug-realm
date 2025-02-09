import { Loader } from 'lucide-react';

import { cn } from '~/lib/utils';
import { type Game } from '~/types';

import GameCard from './GameCard';

type Props = { className?: string; games: Game[]; isLoading: boolean };
export default function GameCardList({ className, games, isLoading }: Props) {
  if (isLoading) return <Loader className="mx-auto animate-spin" size={128} />;

  return (
    <ul
      className={cn(
        'grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8',
        className,
      )}
    >
      {games.map((game) => (
        <li key={game.id}>
          <GameCard
            className="aspect-[16_/_9] shadow transition-transform hover:-translate-y-1"
            {...game}
          />
        </li>
      ))}
    </ul>
  );
}
