import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { env } from '~/env';
import { type Games } from '~/types';
import { cn } from '~/utils/utils';

type Props = { className?: string };
export default function GameCardList({ className }: Props) {
  const { data, isPending, error } = useQuery({
    queryKey: ['allGames'],
    queryFn: async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${env.NEXT_PUBLIC_API_KEY}`,
      );
      return (await response.json()) as Games;
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
      {data.results.map((game) => (
        <li key={game.id}>
          <article className="relative flex aspect-[16_/_9] w-full flex-col overflow-hidden rounded bg-slate-600 shadow transition-transform hover:scale-110">
            <Link
              href={'games/' + game.slug}
              className="absolute inset-0 z-10"
            />
            <div className="relative w-full flex-1">
              <Image
                className="object-cover object-top"
                src={game.background_image}
                alt={game.name + ' image'}
                fill
              />
            </div>
            <div className="p-2">
              <p className="text-lg font-medium">{game.name}</p>
              <ul className="flex gap-1 text-xs italic text-gray-200">
                {game.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
