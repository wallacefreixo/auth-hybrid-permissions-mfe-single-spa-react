import { ReactNode } from 'react';
import { Box } from '@mui/material';

type TContentCardProps = {
  children: ReactNode;
};

export function ContentCard({ children }: TContentCardProps) {
  return <Box sx={{ display: 'flex', gap: 2 }}>{children}</Box>;
}
