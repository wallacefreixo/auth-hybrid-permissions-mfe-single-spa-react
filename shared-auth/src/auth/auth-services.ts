import { apiClient } from '@/http';
import { setCsrfToken } from './csrf-store';
import { navigateToUrl } from 'single-spa';

export type TCsrfResponse = {
  csrfToken: string;
};

export async function getCsrfToken() {
  const response = await apiClient.get<TCsrfResponse>('/auth/csrf');
  setCsrfToken(response.data.csrfToken);
  return response.data.csrfToken;
}

export function loginWithSSO() {
  navigateToUrl('http://localhost:4000/auth/login');
}

export async function logout() {
  await apiClient.post('/auth/logout');
}

export async function getSession() {
  const response = await apiClient.get('/auth/session');
  return response.data;
}
