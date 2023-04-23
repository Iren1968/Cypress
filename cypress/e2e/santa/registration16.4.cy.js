describe('registrationSanta', () => {
  const users = require('cypress/fixtures/users.json');
  beforeEach(() => {
    cy.visit('/');
  });
  users.forEach((user) => {
    it('name and correct email as ${user.email}', () => {
      cy.validLogin(user.email, user.name);
    });
  });
});
