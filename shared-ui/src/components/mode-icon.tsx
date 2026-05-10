import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export function ModeIcon({ mode }: { mode: 'light' | 'dark' }) {
  return mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />;
}
