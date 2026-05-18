import { getDashboardCards } from '@/services/dashboard.service';
import { useQuery } from '@tanstack/react-query';

export function useDashboardCards() {
  return useQuery({
    queryKey: ['dashboard-cards'],
    queryFn: getDashboardCards,
  });
}
