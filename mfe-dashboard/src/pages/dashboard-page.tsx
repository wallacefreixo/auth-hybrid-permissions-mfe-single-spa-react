import { useTranslation } from 'react-i18next';
import { useLogoutMutation, useAuth } from '@app/shared-auth';
import { Button, Card } from '@app/shared-ui';

export function DashboardPage() {
  const { t } = useTranslation();
  const logoutMutation = useLogoutMutation();
  const auth = useAuth();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
  }

  return (
    <Card
      title={t('common.dashboard')}
      description={`${auth.user.email}. ${t('dashboard.description')}`}
    >
      <Button color="error" onClick={handleLogout} sx={{ width: 'fit-content' }}>
        {t('dashboard.logout')}
      </Button>
    </Card>
  );
}
