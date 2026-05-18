import { usePermission } from '@app/shared-auth';

export function useExportPermissions() {
  const canExportPdf = usePermission('dashboard:export:pdf');
  const canExportExcel = usePermission('dashboard:export:excel');

  return {
    canExportPdf,
    canExportExcel,
  };
}
