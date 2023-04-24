export class LoginPage {
  elements = {
    loginfield: () => cy.get(':nth-child(3) > .frm'),
    passwordField: () => cy.get(':nth-child(4) > .frm'),
    loginButton: () => cy.get('.btn-main'),
  };

  login(login, password) {
    this.elements.loginfield().type(login);
    this.elements.passwordField().type(password);
    this.elements.loginButton().click();
  }
}
