import { useQuery } from '@tanstack/react-query';

import { env } from '~/env';
import type { APIResponse } from '~/types';

export default function useFetchGenres() {
  const { data, isLoading } = useQuery({
    queryKey: ['sidebarGenres'],
    queryFn: async () => {
      const response = await fetch(
        `https://api.rawg.io/api/genres?key=${env.NEXT_PUBLIC_API_KEY}`,
      );
      return (await response.json()) as APIResponse;
    },
  });
  return { data, isLoading };
}
