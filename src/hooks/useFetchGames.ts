'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { env } from '~/env';
import { getDatesParam } from '~/lib/utils';
import type { APIResponse, UrlParams, UrlParamsDatesValue } from '~/types';

export default function useFetchGames() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const ordering = searchParams?.get('sort') ?? 'metacritic';
  const date = (searchParams?.get('date') as UrlParamsDatesValue) ?? 'all time';
  const genre = searchParams?.get('genres') ?? null;

  const { data, isLoading } = useQuery({
    queryKey: ['allGames', ordering, date, genre],
    queryFn: async () => {
      try {
        const queryParams = new URLSearchParams();

        if (date && date != 'all time') {
          queryParams.append('dates', getDatesParam(date)!);
        }
        if (ordering) {
          queryParams.append('sort', '-' + ordering);
        }
        if (genre) {
          queryParams.append('genres', genre);
        }

        const response = await fetch(
          `https://api.rawg.io/api/games?key=${env.NEXT_PUBLIC_API_KEY}&${queryParams.toString()}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch games from API.');
        }
        return (await response.json()) as APIResponse;
      } catch {
        throw new Error('An error occurred while fetching games');
      }
    },
  });

  const handleFilterChange = (param: UrlParams, value: string) => {
    if (searchParams) {
      const params = new URLSearchParams(searchParams);
      params.set(param, value);
      router.replace(`${pathname}?${params.toString()}`);
    }
  };

  return {
    handleFilterChange,
    data,
    isLoading,
    activeGenre: genre,
  };
}
