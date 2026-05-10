import { ReactNode } from 'react';
import { Box, Paper, Typography } from '@mui/material';

type TCardProps = {
  children: ReactNode;
  title: string;
  description: string;
};

export function Card({ children, title, description }: TCardProps) {
  return (
    <Paper sx={{ m: 8, p: 4 }}>
      <Box sx={{ display: 'grid', gap: 2 }}>
        <Typography variant="h4"> {title}</Typography>
        <Typography variant="body1"> {description}</Typography>
        {children}
      </Box>
    </Paper>
  );
}
