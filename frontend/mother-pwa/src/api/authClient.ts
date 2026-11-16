// src/api/authClient.ts

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

const ROUTES = {
    csrf: '/autoauth/csrf',
    login: '/auth/login',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
} as const;

interface CsrfResponse {
    token: string;
    headerName: string;
}

export type RefreshResult = 'ok' | 'unauthorized' | 'offline';

let csrfState: CsrfResponse | null = null;
let csrfPromise: Promise<CsrfResponse> | null = null;
let refreshPromise:  Promise<RefreshResult> | null = null;

/**
 * fetch and cache crsf token and header
 */
export async function ensureCsrf(force = false): Promise<CsrfResponse> {
    if (csrfState && !force) return csrfState;
    if (csrfPromise && !force) return csrfPromise;
  
    csrfPromise = (async () => {
      const res = await fetch(`${API_BASE}${ROUTES.csrf}`, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-store',
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch CSRF token (${res.status})`);
      }
  
      const data: CsrfResponse = await res.json();
      csrfState = data;
      return data;
    })().finally(() => {
      csrfPromise = null;
    });
  
    return csrfPromise;
  }


export async function refreshTokens(): Promise<RefreshResult> {
    if (refreshPromise) return refreshPromise;
  
    refreshPromise = (async (): Promise<RefreshResult> => {
      try {
        const csrf = await ensureCsrf();
        const res = await fetch(`${API_BASE}${ROUTES.refresh}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            [csrf.headerName]: csrf.token,
          },
        });
  
        if (res.ok) {
          // Re-sync CSRF in case refresh rotated the CSRF token
          await ensureCsrf(true).catch(() => undefined);
          return 'ok';
        }
  
        if (res.status === 401 || res.status === 403) {
          return 'unauthorized';
        }
  
        return 'offline';
      } catch {
        return 'offline';
      } finally {
        refreshPromise = null;
      }
    })();
  
    return refreshPromise;
  }