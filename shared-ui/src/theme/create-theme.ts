import { createTheme } from '@mui/material/styles';
import type { TThemeMode } from './mode-store';

export function createAppTheme(mode: TThemeMode) {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: 'Inter, Arial, sans-serif',
    },
  });
}
