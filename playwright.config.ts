import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Supports both 'e2e/' and 'tests/' folder conventions
  testMatch: ['**/e2e/**/*.spec.ts', '**/tests/**/*.spec.ts'],
  fullyParallel: false,
  retries: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    // baseURL is set but page.goto() in POMs also use absolute URLs as a fallback
    // so tests run correctly even if this config is not found
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
