import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { enUS } from './messages/en-us';
import { ptBR } from './messages/pt-br';
import { getLocale } from './i18n-store';

export const resources = {
  'pt-BR': {
    translation: ptBR,
  },
  'en-US': {
    translation: enUS,
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: getLocale(),
  fallbackLng: 'pt-BR',
  supportedLngs: ['pt-BR', 'en-US'],
  defaultNS: 'translation',
  ns: ['translation'],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export { i18n };
