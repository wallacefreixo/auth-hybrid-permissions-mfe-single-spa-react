import { useTranslation } from 'react-i18next';
import { Forbidden } from '@app/shared-ui';

export function ForbiddenPage() {
  const { t } = useTranslation();

  return <Forbidden title={t('forbidden.title')} description={t('forbidden.description')} />;
}
