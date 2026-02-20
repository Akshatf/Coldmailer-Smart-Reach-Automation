// tests/directEmail.spec.js
const { test, expect } = require('./fixtures');
const HomePage = require('../pages/HomePage');
const DirectEmailPage = require('../pages/DirectEmailPage');
const { sampleJD } = require('../utils/testData');

test.describe('Direct Email Flow', () => {

  test('Generate Direct Application Email', async ({ page }) => {

    const home = new HomePage(page);
    const direct = new DirectEmailPage(page);

    await home.open();
    await home.switchToDirect();

    await direct.enterJobDescription(sampleJD);
    await direct.clickGenerate();

    const result = await direct.validateEmailGenerated();
    expect(result).toBeTruthy();
  });

});