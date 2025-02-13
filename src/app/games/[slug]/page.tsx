import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import { Suspense } from 'react';

import GamePage from '~/components/GamePage/GamePage';
import { getGame } from '~/lib/get-game';
import { getGames } from '~/lib/get-games';
import { getQueryClient } from '~/lib/get-query-client';

export async function generateStaticParams() {
  const games = await getGames();

  return games.map((game) => ({
    slug: game.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery({
    queryKey: ['game', slug],
    queryFn: () => getGame(slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loader className="animate-spin" size={36} />}>
        <GamePage slug={slug} />
      </Suspense>
    </HydrationBoundary>
  );
}
