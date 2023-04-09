const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: 'ht8vzr',
  e2e: {
    env: {
      environment: 'staging',
      email: 'kapadolgova@gmail.com',
      password: 'Gloria12',
    },
    baseUrl: 'https://santa-secret.ru/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
