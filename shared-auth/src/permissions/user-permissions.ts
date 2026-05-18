import { useAuthStore } from '@/auth';
import { hasPermission } from './auth-permissions';

export function usePermission(permission: string) {
  const { user } = useAuthStore();

  return hasPermission(user.permissions, permission);
}
