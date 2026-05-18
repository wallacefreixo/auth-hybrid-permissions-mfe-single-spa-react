import { BrowserRouter } from 'react-router-dom';
import { AuthGuard, AuthProviders, PermissionGuard } from '@app/shared-auth';
import { UIProviders } from '@app/shared-ui';
import { DashboardPage } from './pages';

export function Root() {
  return (
    <AuthProviders>
      <AuthGuard>
        <UIProviders>
          <BrowserRouter>
            <PermissionGuard permission="dashboard:view">
              <DashboardPage />
            </PermissionGuard>
          </BrowserRouter>
        </UIProviders>
      </AuthGuard>
    </AuthProviders>
  );
}
