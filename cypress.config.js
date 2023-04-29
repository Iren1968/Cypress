const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'ht8vzr',
  e2e: {
    baseUrl: 'https://staging.lpitko.ru/',
    testIsolation: false,
    pageLoadTimeout: 200000,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      environment: 'product',
      mail: 'kapadolgova@gmail.com',
      password: 'Gibbon45',
    },
  },
});
