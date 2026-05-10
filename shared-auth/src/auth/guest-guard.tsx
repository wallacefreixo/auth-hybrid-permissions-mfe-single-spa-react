import { ReactNode, useEffect } from 'react';
import { navigateToUrl } from 'single-spa';
import { useAuth } from './use-auth-store';

export function GuestGuard({ children }: { children: ReactNode }) {
  const auth = useAuth();

  useEffect(() => {
    if (auth.status === 'authenticated') {
      navigateToUrl('/dashboard');
    }
  }, [auth.status]);

  if (auth.status === 'loading') {
    return null;
  }

  if (auth.status === 'authenticated') {
    return null;
  }

  return <>{children}</>;
}
