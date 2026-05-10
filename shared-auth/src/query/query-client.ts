import { QueryClient } from '@tanstack/react-query';

const ONE_MINUTE_IN_MS = 60_000;

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: ONE_MINUTE_IN_MS,
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  });
}
