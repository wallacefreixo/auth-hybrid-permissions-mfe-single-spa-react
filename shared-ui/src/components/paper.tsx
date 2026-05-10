import { ReactNode } from 'react';
import { Paper as PaperMui } from '@mui/material';

export function Paper({ children }: { children: ReactNode }) {
  return <PaperMui sx={{ maxWidth: 420, mx: 'auto', mt: 8, p: 4 }}>{children}</PaperMui>;
}
