'use server';

import { env } from '~/env';
import type { DetailedGame } from '~/types';

const BASE_URL = 'https://api.rawg.io/api/games/';

export const getGame = async (idOrSlug: number | string) => {
  const queryParams = new URLSearchParams();

  queryParams.append('key', env.NEXT_PUBLIC_API_KEY);

  const url = `${BASE_URL}${String(idOrSlug)}?${queryParams.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch games from API.');
  }
  return (await response.json()) as DetailedGame;
};
