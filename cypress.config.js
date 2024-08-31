const { defineConfig } = require("cypress");

module.exports = {
  e2e: {
    baseUrl: 'https://messaging.sinch.com/',
    pageLoadTimeout: 120000, 
    chromeWebSecurity: false, 
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chrome' && browser.name !== 'electron') {
          launchOptions.args.push('--disable-web-security');
          launchOptions.args.push('--disable-site-isolation-trials');
        }
        return launchOptions;
      });
    },
  },
};