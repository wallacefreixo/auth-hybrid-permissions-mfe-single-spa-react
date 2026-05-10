import { useSyncExternalStore } from 'react';

export type TLocale = 'pt-BR' | 'en-US';

type TListener = () => void;

const STORAGE_KEY = 'app-locale';
const listeners = new Set<TListener>();

function getInitialLocale(): TLocale {
  const storedLocale = window.localStorage.getItem(STORAGE_KEY);

  return storedLocale === 'en-US' ? 'en-US' : 'pt-BR';
}

let locale: TLocale = getInitialLocale();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function getLocale(): TLocale {
  return locale;
}

export function subscribeLocale(listener: TListener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function setLocale(nextLocale: TLocale) {
  if (locale === nextLocale) {
    return;
  }

  locale = nextLocale;

  window.localStorage.setItem(STORAGE_KEY, nextLocale);

  emitChange();
}

export function useLocaleStore() {
  return useSyncExternalStore(subscribeLocale, getLocale);
}
