const isBrowser = () => typeof window !== 'undefined';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_INFO: 'userInfo',
  SURVEY_ANSWERS: 'surveyAnswers',
} as const;

type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export function getStorageItem(key: StorageKey): string | null {
  if (!isBrowser()) return null;

  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function setStorageItem(key: StorageKey, value: string): boolean {
  if (!isBrowser()) return false;

  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function removeStorageItem(key: StorageKey): boolean {
  if (!isBrowser()) return false;

  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export function getStorageJson<T>(key: StorageKey): T | null {
  const rawValue = getStorageItem(key);
  if (!rawValue) return null;

  try {
    return JSON.parse(rawValue) as T;
  } catch {
    return null;
  }
}

export function setStorageJson<T>(key: StorageKey, value: T): boolean {
  try {
    return setStorageItem(key, JSON.stringify(value));
  } catch {
    return false;
  }
}
