import ky from 'ky';
import { captureAppError } from '@/lib/error-policy';

export const kyInstance = ky.create({
  prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  timeout: 5000,
  hooks: {
    afterResponse: [
      async (_request, _options, response) => {
        if (response.ok) return response;
        captureAppError(new Error(`HTTP ${response.status} ${response.statusText}`), {
          layer: 'api',
          feature: 'network',
          action: 'after-response',
          tags: { client: 'ky' },
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
        captureAppError(error, {
          layer: 'api',
          feature: 'network',
          action: 'before-error',
          tags: { client: 'ky' },
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
