module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'script',
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: {
        jest: false,
      },
    },
  ],
  ignorePatterns: ['node_modules/', 'test-results/', 'playwright-report/'],
};

