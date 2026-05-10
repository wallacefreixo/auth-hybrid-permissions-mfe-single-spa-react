import { useSyncExternalStore } from 'react';

export type TThemeMode = 'light' | 'dark';

type TListener = () => void;

const STORAGE_KEY = 'app-theme-mode';
const listeners = new Set<TListener>();

let mode: TThemeMode = localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light';

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function getThemeMode() {
  return mode;
}

export function subscribeThemeMode(listener: TListener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function setThemeMode(nextMode: TThemeMode) {
  if (mode === nextMode) {
    return;
  }

  mode = nextMode;

  localStorage.setItem(STORAGE_KEY, nextMode);

  emitChange();
}

export function toggleThemeMode() {
  setThemeMode(mode === 'light' ? 'dark' : 'light');
}

export function useThemeModeStore() {
  return useSyncExternalStore(subscribeThemeMode, getThemeMode);
}
