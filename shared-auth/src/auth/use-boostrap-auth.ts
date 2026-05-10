import { interceptors } from '@/http';
import { bootstrapAuth } from './auth-store';
import { bootstrapCsrfToken } from './csrf-store';

interceptors();

export async function useBootstrapAuth() {
  await Promise.all([bootstrapAuth(), bootstrapCsrfToken()]);
}
