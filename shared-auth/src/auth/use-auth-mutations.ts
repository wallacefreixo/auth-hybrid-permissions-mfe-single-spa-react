import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setAuthenticated, setUnauthenticated } from './auth-store';
import { login, logout, register } from './auth-services';
import { bootstrapCsrfToken, clearCsrfToken } from './csrf-store';

const queryKey = ['auth'];

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async ({ user }) => {
      setAuthenticated(user);
      await queryClient.invalidateQueries({ queryKey });
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: register,
  });
}

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
