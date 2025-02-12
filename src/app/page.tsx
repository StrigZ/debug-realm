import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

import Filter from '~/components/Filter';
import GameCardList from '~/components/GameCardList';
import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar/Sidebar';
import { getGames } from '~/lib/get-games';
import { getGenres } from '~/lib/get-genres';
import { getQueryClient } from '~/lib/get-query-client';

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery({
    queryKey: ['games', {}],
    queryFn: () => getGames(),
  });

  void queryClient.prefetchQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  return (
    <main className="flex h-screen flex-col gap-8 bg-slate-950 px-4 text-white">
      <Header />
      <div className="flex flex-col gap-8 overflow-hidden md:flex-row">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<Loader className="animate-spin" size={36} />}>
            <Sidebar className="shadow-inner md:h-full md:w-[300px]" />
          </Suspense>
        </HydrationBoundary>
        <div className="flex flex-1 flex-col gap-8 overflow-hidden">
          <Suspense fallback={<Loader className="animate-spin" size={36} />}>
            <Filter />
          </Suspense>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<Loader className="animate-spin" size={36} />}>
              <GameCardList className="h-full overflow-y-scroll pb-8 font-sans" />
            </Suspense>
          </HydrationBoundary>
        </div>
      </div>
    </main>
  );
}
