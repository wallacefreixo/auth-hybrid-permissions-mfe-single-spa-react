import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setUnauthenticated } from './auth-store';
import { logout } from './auth-services';
import { bootstrapCsrfToken, clearCsrfToken } from './csrf-store';

const queryKey = ['auth'];

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      clearCsrfToken();
      await bootstrapCsrfToken();

      setUnauthenticated();

      await queryClient.removeQueries({ queryKey });
    },
  });
}
