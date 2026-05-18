import { navigateToUrl } from 'single-spa';
import { apiClient } from '@/http';
import { setCsrfToken } from './csrf-store';

export type TCsrfResponse = {
  csrfToken: string;
};

export type TPayload = {
  email: string;
  password: string;
};

export async function getCsrfToken() {
  const response = await apiClient.get<TCsrfResponse>('/auth/csrf');
  setCsrfToken(response.data.csrfToken);
  return response.data.csrfToken;
}

export function loginWithSSO() {
  navigateToUrl('http://localhost:4000/auth/sso/login');
}

export async function login(payload: TPayload) {
  const response = await apiClient.post('/auth/login', payload);
  return response.data;
}

export async function register(payload: TPayload) {
  const response = await apiClient.post('/auth/register', payload);
  return response.data;
}

export async function logout() {
  await apiClient.post('/auth/logout');
}

export async function getSession() {
  const response = await apiClient.get('/auth/session');
  return response.data;
}
