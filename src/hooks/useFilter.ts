'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type {
  UrlParams,
  UrlParamsDatesValue,
  UrlParamsSortValue,
} from '~/types';

export default function useFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const date = searchParams.get('date') as UrlParamsDatesValue;
  const ordering = searchParams.get('sort') as UrlParamsSortValue;
  const genre = searchParams.get('genre') as string | undefined;

  const handleFilterChange = (param: UrlParams, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(param, value);
    void router.replace(`${pathname}?${params.toString()}`);
  };
  return { handleFilterChange, params: { date, ordering, genre } };
}
