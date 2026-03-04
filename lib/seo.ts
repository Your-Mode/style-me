const DEFAULT_SITE_URL = 'http://localhost:3000';

function trimTrailingSlash(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function getSiteUrl(): string {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!rawSiteUrl) {
    return DEFAULT_SITE_URL;
  }

  try {
    return trimTrailingSlash(new URL(rawSiteUrl).toString());
  } catch {
    return DEFAULT_SITE_URL;
  }
}
