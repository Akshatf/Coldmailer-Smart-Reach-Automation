## Coldmailer Playwright E2E Tests

This project contains end-to-end (E2E) tests for the **Job Mail Generator** app hosted at `https://cold-mailerr.vercel.app/`, using **Playwright Test** and the **Page Object Model (POM)**.

### Tech stack

- **Node.js** + **npm** for runtime and dependency management
- **Playwright Test** (`@playwright/test`) for browser automation and test runner
- **Page Object Model** under `pages/` for reusable, maintainable selectors and actions
- **ESLint** + **Prettier** for linting and consistent formatting
- **GitHub Actions** workflow for CI (if this repo is pushed to GitHub)

---

### Project structure

- `tests/`
  - `directEmail.spec.js` – tests the **Direct Application** email flow
  - `referralEmail.spec.js` – tests the **Referral** email flow
- `pages/`
  - `BasePage.js` – shared helpers (`navigate`, `click`, `type`, etc.)
  - `HomePage.js` – landing page + mode switching
  - `DirectEmailPage.js` – direct application email interactions and assertions
  - `ReferralEmailPage.js` – referral email interactions and assertions
- `utils/`
  - `testData.js` – shared test data (e.g., sample job description)
- `config/`
  - `testConfig.js` – centralized test configuration (e.g., `baseURL`)
- `playwright.config.js` – Playwright Test configuration
- `.github/workflows/playwright.yml` – CI workflow (for GitHub)
- `.eslintrc.cjs` / `.prettierrc` – linting and formatting config

---

### Prerequisites

- **Node.js** 18+ (Node 20 recommended)
- **npm** (comes with Node)

---

### Installation

From the project root:

```bash
cd "c:\Users\AkshatFarkya\Desktop\Coldmailer Playwright"
npm install
npx playwright install
```

`npx playwright install` downloads the required browsers for Playwright.

---

### Configuration (env vars)

The tests use a centralized config in `config/testConfig.js`:

- **`BASE_URL`** (optional)
  - Default: `https://cold-mailerr.vercel.app/`
  - You can override it to point to a different environment (e.g., staging):

    ```bash
    # Windows PowerShell
    $env:BASE_URL="https://your-staging-url.example.com"
    npm test
    ```

    ```bash
    # Unix/macOS
    BASE_URL="https://your-staging-url.example.com" npm test
    ```

If `BASE_URL` is not set, the tests will run against the production URL.

---

### Running tests

Common npm scripts (from `package.json`):

- **All tests (default, headed)**:

  ```bash
  npm test
  ```

- **Headed explicitly**:

  ```bash
  npm run test:headed
  ```

- **Playwright UI mode**:

  ```bash
  npm run test:ui
  ```

- **Open last HTML report**:

  ```bash
  npm run test:report
  ```

> Note: The Playwright config sets `workers: 1` so tests run sequentially. This avoids flaky behavior when the app calls an external AI service.

---

### Linting and formatting

- **Run ESLint**:

  ```bash
  npm run lint
  ```

- **Fix lint issues automatically**:

  ```bash
  npm run lint:fix
  ```

- **Format all files with Prettier**:

  ```bash
  npm run format
  ```

ESLint is configured via `.eslintrc.cjs`, and Prettier via `.prettierrc`.

---

### CI with GitHub Actions

If you push this project to GitHub, the workflow at `.github/workflows/playwright.yml` will:

1. Run on `push` and `pull_request` to `main` / `master`.
2. Install Node.js and dependencies with `npm ci`.
3. Install Playwright browsers with:

   ```bash
   npx playwright install --with-deps
   ```

4. Run:
   - `npm run lint`
   - `npm test`

The workflow sets `BASE_URL` to `https://cold-mailerr.vercel.app/` by default. You can change this in the workflow file to target another environment.

---

### Test behavior and stability

- Tests rely on the real hosted app, which in turn calls an AI backend.
- To reduce flakiness:
  - `workers: 1` in `playwright.config.js` runs tests sequentially.
  - `DirectEmailPage` and `ReferralEmailPage`:
    - Wait for the output element (`.email-result, pre, textarea`) to be visible.
    - Poll for non-empty content for several seconds.
    - Consider the test passing once any non-empty email text is present, rather than matching specific phrases.

If you later introduce backend mocks (for more deterministic tests), you can:

- Use `page.route()` in Playwright to intercept network requests.
- Guard mocking logic behind an env var (e.g., `MOCK_BACKEND=true`) so you can switch between real and mocked behavior.

