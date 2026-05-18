import { apiClient } from '@app/shared-auth';

export type TDashboardCard = {
  id: string;
  title: string;
  value: number;
  description: string;
};

export async function getDashboardCards() {
  const { data } = await apiClient.get('/dashboard/cards');
  return data;
}
