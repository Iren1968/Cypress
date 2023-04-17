import { Login } from './PageObject/Login';
describe('first test suite', () => {
  var login = new Login();

  beforeEach('Passes', () => {
    cy.visit('/');
    cy.loginSS(Cypress.env('email'), Cypress.env('password'));
  });

  it('Test the link Boxes', () => {
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account/boxes"] > .header-item > .header-item__text > .txt--med'
    )
      .should('be.visible')
      .click();
    cy.url().should('include', 'account/boxes');
  });
});
