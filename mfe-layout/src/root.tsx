import { BrowserRouter } from 'react-router-dom';
import { AuthProviders } from '@app/shared-auth';
import { UIProviders } from '@app/shared-ui';
import { Navbar } from './components';

export function Root() {
  return (
    <AuthProviders>
      <UIProviders>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </UIProviders>
    </AuthProviders>
  );
}
