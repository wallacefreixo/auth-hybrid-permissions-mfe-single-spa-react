import { toggleThemeMode, useThemeModeStore } from './mode-store';

export function useThemeMode() {
  const mode = useThemeModeStore();

  return {
    mode,
    toggleThemeMode,
  };
}
