import { ReactElement } from 'react';
import { Tooltip as TooltipMui } from '@mui/material';

type TTooltipProps = {
  children: ReactElement;
  title: string;
};

export function Tooltip({ children, title }: TTooltipProps) {
  return <TooltipMui title={title}>{children}</TooltipMui>;
}
