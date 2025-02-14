import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

import Filter from '~/components/Filter';
import GameCardList from '~/components/GameCardList';
import Sidebar from '~/components/Sidebar/Sidebar';
import { getGames } from '~/lib/get-games';
import { getGenres } from '~/lib/get-genres';
import { getQueryClient } from '~/lib/get-query-client';

export default function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchInfiniteQuery({
    queryKey: ['games', {}],
    queryFn: ({ pageParam }) => getGames({ page: pageParam }),
    initialPageParam: 1,
  });

  void queryClient.prefetchQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
  });

  return (
    <div className="mt-[150px] flex flex-col gap-8 overflow-hidden px-4 md:flex-row lg:px-0">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Loader className="animate-spin" size={36} />{' '}
            </div>
          }
        >
          <Sidebar className="shadow-inner md:h-full md:w-[300px]" />
        </Suspense>
      </HydrationBoundary>
      <div className="relative flex flex-1 flex-col gap-8 overflow-hidden">
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Loader className="animate-spin" size={36} />{' '}
            </div>
          }
        >
          <Filter />
        </Suspense>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <Loader className="animate-spin" size={36} />{' '}
              </div>
            }
          >
            <GameCardList className="h-full overflow-y-scroll pb-8 font-sans" />
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  );
}
