const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { preprocessor } = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on("file:preprocessor", preprocessor(config));

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: false,
  chromeWebSecurity: false,
  defaultCommandTimeout: 8000,
  reporter: 'cypress-mochawesome-reporter',
  retries: {
    runMode: 1,
    openMode: 0
  },
  env:{
    url: 'https://rahulshettyacademy.com'
  },
  e2e: {
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    //   addCucumberPreprocessorPlugin(on, config);
    //   on("file:preprocessor", preprocessor(config));

    //   require('cypress-mochawesome-reporter/plugin')(on)
    // },
    setupNodeEvents,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx,feature}',
    watchForFileChanges: false

  },
});
