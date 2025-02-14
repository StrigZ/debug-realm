'use server';

import { env } from '~/env';
import type {
  APIResponse,
  Game,
  UrlParamsDatesValue,
  UrlParamsSortValue,
} from '~/types';

import { getDatesParamString } from './utils';

const BASE_URL = 'https://api.rawg.io/api/games';

export const getGames = async (params?: {
  page?: number;
  genre?: string;
  date?: UrlParamsDatesValue;
  ordering?: UrlParamsSortValue;
}) => {
  const queryParams = new URLSearchParams();

  queryParams.append('key', env.NEXT_PUBLIC_API_KEY);

  if (params?.date && params?.date != 'all time') {
    queryParams.append('dates', getDatesParamString(params?.date)!);
  }
  if (params?.ordering) {
    queryParams.append('ordering', '-' + params?.ordering);
  }
  if (params?.genre) {
    queryParams.append('genres', params?.genre);
  }

  if (params?.page) {
    queryParams.append('page', String(params?.page));
  }

  const url = `${BASE_URL}?${queryParams.toString()}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch games from API.');
  }
  return (await response.json()) as APIResponse;
};
