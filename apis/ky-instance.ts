import ky from 'ky';
import * as Sentry from '@sentry/nextjs';

export const kyInstance = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 5000,
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        if (response.ok) return response;
        Sentry.captureException(new Error(`HTTP ${response.status} ${response.statusText}`), {
          tags: { layer: 'api', client: 'ky' },
          extra: {
            url: response.url,
            status: response.status,
            statusText: response.statusText,
          },
        });
        return response;
      },
    ],
    beforeError: [
      async (error) => {
        Sentry.captureException(error, {
          tags: { layer: 'api', client: 'ky' },
          extra: {
            url: error.request?.url,
            method: error.request?.method,
            status: error.response?.status,
          },
        });
        return error;
      },
    ],
  },
});
