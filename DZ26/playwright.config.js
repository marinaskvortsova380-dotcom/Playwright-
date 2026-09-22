import { defineConfig, devices } from '@playwright/test';
import { config } from './config/environment.js';

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'playwright-report/results.json' }],
  ],
  use: {
    baseURL: config.baseURL,
    actionTimeout: 10 * 1000,
    navigationTimeout: 15 * 1000,
    httpCredentials: {
      username: config.httpCredentials.username,
      password: config.httpCredentials.password,
    },
    trace: 'on-first-retry',
    screenshot: 'on',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'qauto-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://qauto.forstudy.space',
      },
    },
    {
      name: 'qauto2-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://qauto2.forstudy.space',
      },
    },
  ],
});
