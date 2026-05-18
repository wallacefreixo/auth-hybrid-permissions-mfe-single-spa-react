import { UIProviders } from '@app/shared-ui';
import { Router } from './routes/routes';

export function Root() {
  return (
    <UIProviders>
      <Router />
    </UIProviders>
  );
}
