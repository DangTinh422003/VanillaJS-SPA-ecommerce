const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "./cypress/e2e/**.*",
    baseUrl: "http://localhost:8080",
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
  },
});
