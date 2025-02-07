import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';

import { env } from '~/env';
import { type APIResponse, type Game } from '~/types';
import { cn } from '~/utils/utils';

import GameCard from './GameCard';

type Props = { className?: string };
export default function GameCardList({ className }: Props) {
  const { data, isPending, error } = useQuery({
    queryKey: ['allGames'],
    queryFn: async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${env.NEXT_PUBLIC_API_KEY}`,
      );
      return (await response.json()) as APIResponse;
    },
  });

  if (isPending) return <Loader className="animate-spin" size={128} />;

  if (error) return 'An error has occurred: ' + error.message;

  if (!data) return <div>no data</div>;

  return (
    <ul
      className={cn(
        'grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8',
        className,
      )}
    >
      {(data.results as Game[]).map((game) => (
        <li key={game.id}>
          <GameCard
            classNames="aspect-[16_/_9] transition-transform hover:scale-110 shadow "
            {...game}
          />
        </li>
      ))}
    </ul>
  );
}
