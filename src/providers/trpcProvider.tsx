'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import superjson from 'superjson';

import { type TAppRouter } from '@/server/routers/_app';
import getBaseUrl from '@/utils/helpers/getBaseUrl';

export const trpc = createTRPCReact<TAppRouter>({
  unstable_overrides: {
    useMutation: {
      async onSuccess(opts) {
        await opts.originalFn();
        await opts.queryClient.invalidateQueries();
      },
    },
  },
});

const TRPCProvider = ({ children }: {children: React.ReactNode}) => {
  const base = getBaseUrl();
  const url = `${base}/api/trpc`;

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => trpc.createClient({
    links: [
      loggerLink({
        enabled: (opts) => process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error),
      }),
      httpBatchLink({ url }),
    ],
    transformer: superjson,
  }));

  return (

    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default TRPCProvider;
