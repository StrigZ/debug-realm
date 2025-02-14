'use client';

import { type InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { getGames } from '~/lib/get-games';
import { getQueryClient } from '~/lib/get-query-client';
import type { APIResponse } from '~/types';

import useFilter from './useFilter';

export default function useFetchGames() {
  const queryClient = getQueryClient();
  const { params } = useFilter();
  const { date, genre, ordering } = params;

  const { data, isFetchingNextPage, isLoading, fetchNextPage, status } =
    useInfiniteQuery({
      queryKey: ['games', { date, ordering, genre }],
      queryFn: ({ pageParam }) =>
        getGames({ date, ordering, genre, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, _, lastPageParam) => {
        return lastPage.next ? lastPageParam + 1 : undefined;
      },
      initialData: () => {
        if (!date && !ordering && !genre) {
          const cachedData = queryClient.getQueryData(['games', {}]);

          if (cachedData) {
            return cachedData as InfiniteData<APIResponse, number>;
          }
        }

        return undefined;
      },
    });

  return {
    data,
    isLoading: isFetchingNextPage || isLoading || status === 'pending',
    fetchNextPage,
  };
}
