'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import type * as React from 'react';

import CartContextProvider from '~/context/CartContextProvider';

import { getQueryClient } from './lib/get-query-client';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>{children}</CartContextProvider>
    </QueryClientProvider>
  );
}
