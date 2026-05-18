import { registerApplication } from 'single-spa';

export function registerApplications() {
  registerApplication({
    name: '@app/mfe-layout',
    app: () => import('@app/mfe-layout'),
    activeWhen: () => true,
  });

  registerApplication({
    name: '@app/mfe-auth',
    app: () => import('@app/mfe-auth'),
    activeWhen: (location) => location.pathname === '/login' || location.pathname === '/register',
  });

  registerApplication({
    name: '@app/mfe-dashboard',
    app: () => import('@app/mfe-dashboard'),
    activeWhen: (location) => location.pathname.startsWith('/dashboard'),
  });

  registerApplication({
    name: '@app/mfe-forbidden',
    app: () => import('@app/mfe-forbidden'),
    activeWhen: (location) => location.pathname.startsWith('/forbidden'),
  });
}
