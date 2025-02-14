'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type * as React from 'react';

import CartContextProvider from '~/context/CartContextProvider';

import ThemeContextProvider from './context/ThemeContextProvider';
import { getQueryClient } from './lib/get-query-client';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <ThemeContextProvider>{children}</ThemeContextProvider>
      </CartContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
