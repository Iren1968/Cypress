import { Login } from '../santa/PageObject/Login';

describe('Santa second test suite', () => {
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
  it('Test a link Create a box', () => {
    cy.get('.home-page-buttons > [href="/box/new"] > .btn-main').click();
    cy.url().should('include', 'box/new');
  });
  it('Test a link Quick draw', () => {
    cy.get('[href="/randomizer"] > .btn-secondary').click();
    cy.url().should('include', 'randomizer');
  });
  it('Test a link Account', () => {
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > .layout-row-start > [href="/account"] > .header-item > .header-item__text > .txt--med'
    ).click();
    cy.url().should('include', 'account');
  });
});
