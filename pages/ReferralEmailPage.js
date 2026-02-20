// pages/ReferralEmailPage.js
const BasePage = require('./BasePage');

class ReferralEmailPage extends BasePage {
  constructor(page) {
    super(page);

    this.jobDescriptionBox = page.locator('textarea').first();
    this.generateButton = page.locator('button:has-text("Generate Referral Email")');
    this.generatedEmailOutput = page.locator('.email-result, pre, textarea').last();
  }

  async enterJobDescription(text) {
    await this.type(this.jobDescriptionBox, text);
  }

  async clickGenerate() {
    await this.click(this.generateButton);
  }

  async waitForEmail() {
    // Initial delay while the AI starts generating
    await this.page.waitForTimeout(4000);

    // Wait until the output element is visible (if it isn't already)
    await this.generatedEmailOutput.waitFor({ state: 'visible', timeout: 20000 });
  }

  async validateEmailGenerated() {
    await this.waitForEmail();

    // Poll for non-empty generated content (handles slow AI responses)
    for (let i = 0; i < 10; i++) {
      const tagName = await this.generatedEmailOutput.evaluate(el =>
        el.tagName.toLowerCase()
      );

      let text;
      if (tagName === 'textarea' || tagName === 'input') {
        text = await this.generatedEmailOutput.inputValue();
      } else {
        text = await this.generatedEmailOutput.innerText();
      }

      if (text && text.trim().length > 0) {
        return true;
      }

      await this.page.waitForTimeout(2000);
    }

    return false;
  }
}

module.exports = ReferralEmailPage;