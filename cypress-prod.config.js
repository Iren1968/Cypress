const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'ht8vzr',
  e2e: {
    baseUrl: 'https://santa-secret.ru/',
    pageLoadTimeout: 200000,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      environment: 'staging',
      mail: 'kapadolgova@gmail.com',
      password: 'Gloria12',
    },
  },
});
