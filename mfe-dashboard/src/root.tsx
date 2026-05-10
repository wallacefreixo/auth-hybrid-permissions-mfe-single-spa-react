import { BrowserRouter } from 'react-router-dom';
import { AuthGuard, AuthProviders } from '@app/shared-auth';
import { UIProviders } from '@app/shared-ui';
import { DashboardPage } from './pages';

export function Root() {
  return (
    <AuthProviders>
      <AuthGuard>
        <UIProviders>
          <BrowserRouter>
            <DashboardPage />
          </BrowserRouter>
        </UIProviders>
      </AuthGuard>
    </AuthProviders>
  );
}
