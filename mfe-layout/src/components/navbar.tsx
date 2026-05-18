import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@app/shared-auth';
import { Header, NavItem } from '@app/shared-ui';
import LanguageSwitcher from './language-switcher';
import ThemeSwitcher from './theme-switcher';

export function Navbar() {
  const { t } = useTranslation();
  const auth = useAuth();

  function menu() {
    if (auth.status === 'authenticated') {
      return (
        <NavItem component={Link} to="/dashboard">
          {t('common.dashboard')}
        </NavItem>
      );
    }

    return (
      <>
        <NavItem component={Link} to="/login">
          {t('common.login')}
        </NavItem>
        <NavItem component={Link} to="/register">
          {t('common.register')}
        </NavItem>
      </>
    );
  }

  return (
    <Header title={t('common.appName')}>
      {menu()}

      <LanguageSwitcher />
      <ThemeSwitcher />
    </Header>
  );
}
