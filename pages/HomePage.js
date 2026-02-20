// pages/HomePage.js
const BasePage = require('./BasePage');
const { baseURL } = require('../config/testConfig');

class HomePage extends BasePage {
  constructor(page) {
    super(page);

    this.directModeBtn = page.locator('button:has-text("Direct Application")');
    this.referralModeBtn = page.locator('button:has-text("Ask for Referral")');
  }

  async open() {
    await this.navigate(baseURL);
  }

  async switchToDirect() {
    await this.click(this.directModeBtn);
  }

  async switchToReferral() {
    await this.click(this.referralModeBtn);
  }
}

module.exports = HomePage;