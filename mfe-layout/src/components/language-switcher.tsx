import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSelect, useLocale } from '@app/shared-ui';

type TLocale = 'pt-BR' | 'en-US';

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextLocale = event.target.value as TLocale;
    setLocale(nextLocale);
  }

  return (
    <LanguageSelect
      value={locale}
      onChange={handleChange}
      aria-label={t('LanguageSwitcher.ariaLabel')}
      options={[
        {
          value: 'pt-BR',
          flag: '🇧🇷',
          label: t('LanguageSwitcher.portuguese'),
        },
        {
          value: 'en-US',
          flag: '🇺🇸',
          label: t('LanguageSwitcher.english'),
        },
      ]}
    />
  );
}
