import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { i18n } from './i18n';
import { useLocale } from './use-locale';

export function I18nProvider({ children }: { children: ReactNode }) {
  const { locale } = useLocale();

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
