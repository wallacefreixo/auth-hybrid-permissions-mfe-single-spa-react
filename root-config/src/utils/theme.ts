export function getInitialTheme() {
  return localStorage.getItem('app-theme-mode') || 'light';
}
