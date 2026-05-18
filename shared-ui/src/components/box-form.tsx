import { ReactNode, SubmitEventHandler } from 'react';
import { Box } from '@mui/material';

type TBoxFormProps = {
  children: ReactNode;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
};

export function BoxForm({ children, onSubmit }: TBoxFormProps) {
  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ display: 'grid', gap: 2 }}>
      {children}
    </Box>
  );
}
