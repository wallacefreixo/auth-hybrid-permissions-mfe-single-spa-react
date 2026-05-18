import type { ButtonProps } from '@mui/material/Button';
import TableViewIcon from '@mui/icons-material/TableView';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { Tooltip } from './tooltip';
import { Button } from './button';

type TExportButtonProps = {
  title: string;
  icon: 'excel' | 'pdf';
  onClick: ButtonProps['onClick'];
};

export function ExportButton({ title, icon, onClick }: TExportButtonProps) {
  return (
    <Tooltip title={title}>
      <Button variant="outlined" size="small" onClick={onClick}>
        {icon === 'excel' ? <TableViewIcon /> : <PictureAsPdfOutlinedIcon />}
      </Button>
    </Tooltip>
  );
}
