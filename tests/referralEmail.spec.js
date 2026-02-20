// tests/referralEmail.spec.js
const { test, expect } = require("./fixtures");
const HomePage = require("../pages/HomePage");
const ReferralEmailPage = require("../pages/ReferralEmailPage");
const { sampleJD } = require("../utils/testData");

test.describe("Referral Email Flow", () => {
  test("Generate Referral Email", async ({ page }) => {
    const home = new HomePage(page);
    const referral = new ReferralEmailPage(page);

    await home.open();
    await home.switchToReferral();

    await referral.enterJobDescription(sampleJD);
    await referral.clickGenerate();

    const result = await referral.validateEmailGenerated();
    expect(result).toBeTruthy();
  });
});
