import { ReactNode, useMemo } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createAppTheme, useThemeMode } from '@/theme';
import { I18nProvider } from '@/i18n';

export function UIProviders({ children }: { children: ReactNode }) {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <I18nProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </I18nProvider>
  );
}
