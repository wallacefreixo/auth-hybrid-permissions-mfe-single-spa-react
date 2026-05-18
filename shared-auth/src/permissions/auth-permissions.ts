import { PermissionTree } from '@/auth';

export function hasPermission(permissions: PermissionTree, permission: string) {
  const parts = permission.split(':');

  let current: true | PermissionTree = permissions;

  for (const part of parts) {
    if (typeof current !== 'object' || current === null || !(part in current)) {
      return false;
    }

    current = current[part];
  }

  return current === true;
}
