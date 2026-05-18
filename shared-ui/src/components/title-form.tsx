import { ReactNode } from 'react';
import { Typography } from '@mui/material';

export function TitleForm({ children }: { children: ReactNode }) {
  return (
    <Typography variant="h4" component="h1" gutterBottom>
      {children}
    </Typography>
  );
}
