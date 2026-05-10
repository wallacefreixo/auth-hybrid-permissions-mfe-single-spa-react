import { AuthProviders, GuestGuard } from '@app/shared-auth';
import { UIProviders } from '@app/shared-ui';
import { Router } from './routes/routes';

export function Root() {
  return (
    <AuthProviders>
      <GuestGuard>
        <UIProviders>
          <Router />
        </UIProviders>
      </GuestGuard>
    </AuthProviders>
  );
}
