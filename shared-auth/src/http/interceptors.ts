import { getCsrfTokenFromMemory } from '@/auth/csrf-store';
import { apiClient } from './api-client';

let isConfigured = false;

export function interceptors() {
  if (isConfigured) {
    return;
  }

  isConfigured = true;

  apiClient.interceptors.request.use(async (config) => {
    const csrfToken = getCsrfTokenFromMemory();

    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      return Promise.reject(error);
    },
  );
}
