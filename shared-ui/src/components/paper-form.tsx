import { ReactNode } from 'react';
import { Paper } from '@mui/material';

export function PaperForm({ children }: { children: ReactNode }) {
  return <Paper sx={{ maxWidth: 420, mx: 'auto', mt: 8, p: 4 }}>{children}</Paper>;
}
