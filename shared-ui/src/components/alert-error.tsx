import { ReactNode } from 'react';
import { Alert } from '@mui/material';

export function AlertError({ children }: { children: ReactNode }) {
  return <Alert severity="error">{children}</Alert>;
}
