import { Box, MenuItem, Select, type SelectProps } from '@mui/material';

type TOptions = {
  label: string;
  flag: string;
  value: string;
};

type TLanguageSelectProps = {
  options: TOptions[];
} & SelectProps;

export function LanguageSelect({ options, ...props }: TLanguageSelectProps) {
  return (
    <Select
      size="small"
      sx={{
        minWidth: 90,
        color: 'inherit',
        '& .MuiSelect-icon': {
          color: 'inherit',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'currentColor',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'currentColor',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: 'currentColor',
        },
      }}
      {...props}
    >
      {options.map((option) => (
        <MenuItem value={option.value}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>{option.flag}</span>
            {option.label}
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
}
