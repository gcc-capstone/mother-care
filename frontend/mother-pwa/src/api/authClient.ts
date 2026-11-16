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

