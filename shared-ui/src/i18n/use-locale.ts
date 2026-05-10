import { setLocale, useLocaleStore } from './i18n-store';

export function useLocale() {
  const locale = useLocaleStore();

  return {
    locale,
    setLocale,
  };
}
