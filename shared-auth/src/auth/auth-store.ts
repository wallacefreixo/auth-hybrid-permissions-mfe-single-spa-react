import { useSyncExternalStore } from 'react';
import { getSession } from './auth-services';

export type TAuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export type PermissionTree = {
  [key: string]: true | PermissionTree;
};

type TUser = {
  id: string;
  email: string;
  permissions: PermissionTree;
};

type TAuthState = {
  status: TAuthStatus;
  user: TUser;
  isBootstrapped: boolean;
};

type TListener = () => void;

const listeners = new Set<TListener>();

let state: TAuthState = {
  status: 'loading',
  user: {
    id: '',
    email: '',
    permissions: {},
  },
  isBootstrapped: false,
};

let bootstrapPromise: Promise<void> | null = null;

function emitChange() {
  listeners.forEach((listener) => listener());
}

function setState(partial: Partial<TAuthState>) {
  state = {
    ...state,
    ...partial,
  };

  emitChange();
}

function getAuthState() {
  return state;
}

export function subscribeAuthStore(listener: TListener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function setAuthenticated(user: TUser) {
  setState({
    status: 'authenticated',
    user,
    isBootstrapped: true,
  });
}

export function setUnauthenticated() {
  setState({
    status: 'unauthenticated',
    user: {
      id: '',
      email: '',
      permissions: {},
    },
    isBootstrapped: true,
  });
}

export async function bootstrapAuth() {
  if (state.isBootstrapped) {
    return;
  }

  if (bootstrapPromise) {
    return bootstrapPromise;
  }

  setState({ status: 'loading' });

  bootstrapPromise = (async () => {
    try {
      const session = await getSession();
      setAuthenticated(session.user);
    } catch {
      setUnauthenticated();
    } finally {
      bootstrapPromise = null;
    }
  })();

  return bootstrapPromise;
}

export function useAuthStore() {
  return useSyncExternalStore(subscribeAuthStore, getAuthState);
}
