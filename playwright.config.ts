import { defineConfig, devices } from '@playwright/test';

const devCommand = process.platform === 'win32' ? 'pnpm.cmd dev' : 'pnpm dev';

export default defineConfig({
  testDir: './e2e',
  timeout: 120_000,
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: devCommand,
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true,
    env: {
      NEXT_PUBLIC_E2E_TEST_MODE: 'true',
      NEXT_PUBLIC_API_URL: 'http://127.0.0.1:3000',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
