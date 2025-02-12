'use client';

import { useQuery } from '@tanstack/react-query';

import { getGames } from '~/lib/get-games';
import { getQueryClient } from '~/lib/get-query-client';

import useFilter from './useFilter';

export default function useFetchGames() {
  const queryClient = getQueryClient();
  const { params } = useFilter();
  const { date, genre, ordering } = params;

  const { data: games, isLoading } = useQuery({
    queryKey: ['games', { date, ordering, genre }],
    queryFn: () => getGames({ date, ordering, genre }),
    initialData: () => {
      // Use the prefetched data if no filters are applied
      if (!date && !ordering && !genre) {
        return queryClient.getQueryData(['games', {}]);
      }

      return undefined;
    },
  });

  return {
    games,
    isLoading,
  };
}
