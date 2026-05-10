import { getCsrfToken } from './auth-services';

let csrfToken: string | null = null;

export function setCsrfToken(token: string) {
  csrfToken = token;
}

export function getCsrfTokenFromMemory() {
  return csrfToken;
}

export function clearCsrfToken() {
  csrfToken = null;
}

let csrfPromise: Promise<void> | null = null;

export async function bootstrapCsrfToken() {
  if (csrfPromise) {
    return csrfPromise;
  }

  csrfPromise = (async () => {
    try {
      await getCsrfToken();
    } finally {
      csrfPromise = null;
    }
  })();

  return csrfPromise;
}
