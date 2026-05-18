export const enUS = {
  common: {
    appName: 'Auth App',
    dashboard: 'Dashboard',
    login: 'Login',
    register: 'Register',
    emailLabel: 'Email',
    emailHelper: 'Please enter a valid email address.',
    passwordLabel: 'Password',
    passwordHelper: 'Password must be at least 6 characters long.',
  },
  login: {
    error: 'Unable to sign in.',
  },
  register: {
    error: 'Failed to register user.',
  },
  dashboard: {
    description: 'You have successfully accessed a protected route.',
    logout: 'Log out',
    export: 'Export to',
  },
  theme: {
    toggle: 'Toggle theme',
  },
  LanguageSwitcher: {
    ariaLabel: 'Change language',
    portuguese: 'Portuguese',
    english: 'English',
  },
  forbidden: {
    title: 'Access denied',
    description: 'You do not have permission to access this resource.',
  },
} as const;
