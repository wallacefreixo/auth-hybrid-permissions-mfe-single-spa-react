import { useTranslation } from 'react-i18next';
import { Paper, Title, Button } from '@app/shared-ui';
import { loginWithSSO } from '@app/shared-auth';

export function LoginPage() {
  const { t } = useTranslation();

  return (
    <Paper>
      <Title>{t('common.login')}</Title>

      <Button onClick={loginWithSSO}>{t('common.login')} SSO</Button>
    </Paper>
  );
}
