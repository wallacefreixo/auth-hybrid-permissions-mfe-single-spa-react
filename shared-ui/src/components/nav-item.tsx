import { ElementType, ReactNode } from 'react';
import { Button } from '@mui/material';

type TNavItemProps = {
  children: ReactNode;
  component: ElementType;
  to: string;
};

export function NavItem({ children, component, to }: TNavItemProps) {
  return (
    <Button color="inherit" component={component} to={to}>
      {children}
    </Button>
  );
}
