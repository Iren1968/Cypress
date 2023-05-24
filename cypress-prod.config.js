const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'ht8vzr',
  viewportWidth: 1920,
  viewportHeight: 1080,
  e2e: {
    baseUrl: 'https://santa-secret.ru/',
    pageLoadTimeout: 200000,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
    env: {
      environment: 'staging',
      mail: 'kapadolgova@gmail.com',
      password: 'Gibbon45',
    },
  },
});
