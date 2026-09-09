import type { AdminModule, AdminUser } from '@/lib/api';

export const ADMIN_TOKEN_KEY = 'mayelia_admin_token';
export const ADMIN_USER_KEY = 'mayelia_admin_user';

export function getAdminToken(): string | null {
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string) {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  sessionStorage.removeItem(ADMIN_USER_KEY);
}

export function getAdminUser(): AdminUser | null {
  const raw = sessionStorage.getItem(ADMIN_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export function setAdminUser(user: AdminUser) {
  sessionStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
}

export function canAccessModule(module: AdminModule): boolean {
  const user = getAdminUser();
  if (!user) return false;
  return user.is_super_admin || user.permissions.includes(module);
}

export function isSuperAdmin(): boolean {
  return getAdminUser()?.is_super_admin ?? false;
}
