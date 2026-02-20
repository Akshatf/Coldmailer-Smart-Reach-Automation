// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 120000,
  // Run with a single worker to avoid flaky concurrency with the external AI service
  workers: 1,
  use: {
    headless: false,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 30000,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [['html', { open: 'always' }]],
});