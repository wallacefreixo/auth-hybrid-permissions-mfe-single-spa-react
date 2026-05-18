import { ReactNode, useEffect } from 'react';
import { navigateToUrl } from 'single-spa';
import { usePermission } from './user-permissions';

type Props = {
  children: ReactNode;
  permission: string;
};

export function PermissionGuard({ children, permission }: Props) {
  const allowed = usePermission(permission);

  useEffect(() => {
    if (!allowed) {
      navigateToUrl('/forbidden');
    }
  }, [allowed]);

  if (!allowed) {
    return null;
  }

  return children;
}
