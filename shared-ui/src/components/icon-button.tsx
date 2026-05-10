import { ReactNode } from 'react';
import { IconButton as IconButtonMui, type IconButtonProps } from '@mui/material';

type TIconButtonProps = {
  children: ReactNode;
} & IconButtonProps;

export function IconButton({ children, ...props }: TIconButtonProps) {
  return (
    <IconButtonMui color="inherit" {...props}>
      {children}
    </IconButtonMui>
  );
}
