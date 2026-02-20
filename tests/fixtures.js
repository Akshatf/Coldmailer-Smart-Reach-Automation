const base = require('@playwright/test');

// Extend the base test with optional backend mocking.
// To enable mocking, run with MOCK_BACKEND=true in the environment.
const test = base.test.extend({
  page: async ({ page }, use) => {
    if (process.env.MOCK_BACKEND === 'true') {
      // Example: intercept API calls (adjust URL patterns to match your backend).
      await page.route('**/api/**', async (route) => {
        // Return a canned successful response.
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            subject: 'Sample Mocked Subject',
            body: 'This is a mocked email body used for deterministic tests.',
          }),
        });
      });
    }

    await use(page);
  },
});

module.exports = {
  test,
  expect: base.expect,
};

