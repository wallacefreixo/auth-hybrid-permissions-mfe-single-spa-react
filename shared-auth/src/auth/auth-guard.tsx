import { ReactNode, useEffect } from 'react';
import { navigateToUrl } from 'single-spa';
import { useAuth } from './use-auth-store';

export function AuthGuard({ children }: { children: ReactNode }) {
  const auth = useAuth();

  useEffect(() => {
    if (auth.status === 'unauthenticated') {
      navigateToUrl('/login');
    }
  }, [auth.status]);

  if (auth.status === 'loading') {
    return null;
  }

  if (auth.status === 'unauthenticated') {
    return null;
  }

  return <>{children}</>;
}
