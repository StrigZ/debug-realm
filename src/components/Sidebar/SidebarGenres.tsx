import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import Link from 'next/link';

import { env } from '~/env';
import { APIResponse, Genre } from '~/types';

type Props = {};
export default function SidebarGenres({}: Props) {
  const { data, isPending, error } = useQuery({
    queryKey: ['sidebarGenres'],
    queryFn: async () => {
      const response = await fetch(
        `https://api.rawg.io/api/genres?key=${env.NEXT_PUBLIC_API_KEY}`,
      );
      return (await response.json()) as APIResponse;
    },
  });

  if (isPending) return <Loader className="animate-spin" size={128} />;

  if (error) return 'An error has occurred: ' + error.message;

  if (!data) return <div>no data</div>;

  return (
    <section className="space-y-4">
      <h2 className="sticky top-0 bg-slate-950 p-4 pt-0 text-3xl font-bold shadow">
        Genres
      </h2>
      <ul>
        {(data.results as Genre[]).map((genre) => (
          <li key={genre.id} className="flex gap-4">
            <Link
              href={'/genre/' + genre.slug}
              className="w-full rounded px-4 py-2 text-lg transition-colors hover:bg-slate-600 active:scale-95"
            >
              {genre.name === 'Massively Multiplayer' ? 'MMO' : genre.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
