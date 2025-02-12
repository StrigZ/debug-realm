'use server';

import { env } from '~/env';
import type { APIResponse, Genre } from '~/types';

export const getGenres = async () => {
  const response = await fetch(
    `https://api.rawg.io/api/genres?key=${env.NEXT_PUBLIC_API_KEY}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch games from API.');
  }
  const res = (await response.json()) as APIResponse;

  return res.results as Genre[];
};
