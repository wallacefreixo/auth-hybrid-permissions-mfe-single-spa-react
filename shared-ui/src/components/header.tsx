import { ReactNode } from 'react';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';

type THeaderProps = {
  children: ReactNode;
  title: string;
};

export function Header({ children, title }: THeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>{children}</Box>
      </Toolbar>
    </AppBar>
  );
}
