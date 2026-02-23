'use client';

import { useEffect } from 'react';
import { captureAppError } from '@/lib/error-policy';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    captureAppError(error, {
      layer: 'ui',
      feature: 'global-error-boundary',
      action: 'render-fallback',
      extra: { digest: error.digest },
    });
  }, [error]);

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
      </body>
    </html>
  );
}
