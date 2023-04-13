import { Login } from './PageObject/Login';
describe('first test suite', () => {
  var login = new Login();

  beforeEach('Passes', () => {
    cy.visit('/');
    login.btnLogin().click();
    login.email().type(Cypress.env('mail'));
    login.password().type(Cypress.env('password'));
    login.clickBtnLogin().wait(65000).click();
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
