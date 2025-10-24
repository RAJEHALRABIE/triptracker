// minimal Playwright config
module.exports = {
  use: { headless: true },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } }
  ],
  testDir: './tests'
};
