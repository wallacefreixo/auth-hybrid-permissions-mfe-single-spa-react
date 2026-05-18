import { Link as LinkMui, type LinkProps } from '@mui/material';

export function Link(props: LinkProps) {
  return <LinkMui type="button" component="button" variant="body2" {...props} />;
}
