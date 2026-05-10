import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip, ModeIcon, useThemeMode } from '@app/shared-ui';

export default function ThemeSwitcher() {
  const { t } = useTranslation();
  const { mode, toggleThemeMode } = useThemeMode();

  return (
    <Tooltip title={t('theme.toggle')}>
      <IconButton onClick={toggleThemeMode} aria-label={t('theme.toggle')}>
        <ModeIcon mode={mode} />
      </IconButton>
    </Tooltip>
  );
}
