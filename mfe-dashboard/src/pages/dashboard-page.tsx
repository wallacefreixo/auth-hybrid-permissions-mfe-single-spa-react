import { useTranslation } from 'react-i18next';
import { useLogoutMutation, useAuth } from '@app/shared-auth';
import { Button, Card, CircularLoading, ExportButton, ContentCard } from '@app/shared-ui';
import { useDashboardCards } from '@/queries/dashboard.queries';
import { TDashboardCard } from '@/services/dashboard.service';
import { useExportPermissions } from '@/hooks/use-export-permissions';

export function DashboardPage() {
  const { t } = useTranslation();
  const { data, isLoading } = useDashboardCards();
  const { canExportPdf, canExportExcel } = useExportPermissions();
  const logoutMutation = useLogoutMutation();
  const auth = useAuth();

  async function handleLogout() {
    await logoutMutation.mutateAsync();
  }

  if (isLoading) return <CircularLoading />;

  return (
    <>
      <Card
        title={t('common.dashboard')}
        description={`${auth.user.email}. ${t('dashboard.description')}`}
      >
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          sx={{ width: 'fit-content' }}
        >
          {t('dashboard.logout')}
        </Button>
      </Card>

      {data.cards.map((card: TDashboardCard) => (
        <Card key={card.id} title={card.title} description={card.description}>
          <ContentCard>
            <label>{card.value}</label>

            {canExportPdf && (
              <ExportButton
                title={`${t('dashboard.export')} PDF`}
                icon="pdf"
                onClick={() => alert('PDF')}
              />
            )}

            {canExportExcel && (
              <ExportButton
                title={`${t('dashboard.export')} Excel`}
                icon="excel"
                onClick={() => alert('Excel')}
              />
            )}
          </ContentCard>
        </Card>
      ))}
    </>
  );
}
