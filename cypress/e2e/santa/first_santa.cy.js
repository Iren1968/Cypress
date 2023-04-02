describe('first test suite', () => {
  beforeEach('Passes', () => {
    cy.visit('/');
    cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med'
    ).click();
    cy.get(':nth-child(3) > .frm').type('kapadolgova@gmail.com');
    cy.get(':nth-child(4) > .frm').type('Gibbon45');
    cy.get('.btn-main').wait(5000).click();
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
