describe('first test suite', () => {
  it('go to the santa site', () => {
    cy.visit('https://staging.lpitko.ru/');
    cy.contains('Вход и регистрация').should('exist');
  });
});
