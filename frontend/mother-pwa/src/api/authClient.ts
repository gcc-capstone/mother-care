// src/api/authClient.ts

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';
const API_PREFIX = '/mother-care/api/v1';

const AUTH_ROUTES = {
    csrf: '/autoauth/csrf',
    login: '/auth/login',
    refresh: `/${API_PREFIX}/auth/refresh`,
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

function normalizePath(path: string): string {
    return path.startsWith('/') ? path : `/${path}`;
}

function isMutatingMethod(method?: string): boolean {
    const m = (method ?? 'GET').toUpperCase();
    return !['GET', 'HEAD', 'OPTIONS', 'TRACE'].includes(m);
}

/**
 * fetch and cache crsf token and header
 */
export async function ensureCsrf(force = false): Promise<CsrfResponse> {
    if (csrfState && !force) return csrfState;
    if (csrfPromise && !force) return csrfPromise;
  
    csrfPromise = (async () => {
      const res = await fetch(`${API_BASE}${AUTH_ROUTES.csrf}`, {
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
        const res = await fetch(`${API_BASE}${AUTH_ROUTES.refresh}`, {
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

/**
 * Runs prior to every request to the backend.
 * 
 * Use this method instead of 'fetch'
 * 
 * @param path 
 * @param init 
 * @returns 
 */
export async function motherApiFetch(path: string, init:RequestInit = {}): Promise<Response> {

    path = normalizePath(path);

    const send = async (): Promise<Response> => {
        const headers = new Headers(init.headers);

        // if its a put patch post etc. make sure you have csrf token
        if (isMutatingMethod(init.method)) {
            const csrf = await ensureCsrf();
            headers.set(csrf.headerName, csrf.token)
        }

        return fetch(`${API_BASE}${path}`, {
            ...init,
            credentials: 'include',
            headers,
        });
    }

    let result: Response;

    try {
        result = await send();
    } catch {
        // error for failure
        throw new Error("This is filler to compile make a real error!!!!!")
    }

    const authBypass = path === AUTH_ROUTES.csrf;

    if (result.status === 401 && authBypass) {
        const status = await refreshTokens();

        if (status === 'ok') {
            try {
                result = await send();
            } catch {
                throw new Error("This is filler make this a real error!1!!!!");
            }
        } else if (status === 'offline') {
            // continue for now throw error
        } else {
            window.dispatchEvent(new Event('auth:session-expired'));
        }
    }

    return result;

}

/**
 * fetch for all mother-care backend endpoints
 */
export function motherApiFetchV1 (path: string, init: RequestInit = {}): Promise<Response> {
    return motherApiFetch(`${API_PREFIX}${path}`, init);
}