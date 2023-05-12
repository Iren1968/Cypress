const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const createEsbuildPlugin =
  require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin;
const addCucumberPreprocessorPlugin =
  require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin;

module.exports = defineConfig({
  projectId: 'ht8vzr',
  e2e: {
    baseUrl: 'https://santa-secret.ru/',
    testIsolation: false,
    specPattern: '**/*.feature',
    pageLoadTimeout: 200000,
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on('file:preprocessor', bundler);
      addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    env: {
      environment: 'product',
      mail: 'kapadolgova@gmail.com',
      password: 'Gibbon45',
    },
  },
});
