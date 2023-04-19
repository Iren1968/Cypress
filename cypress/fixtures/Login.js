export class Login {
  btnLogin() {
    return cy.get(
      '.layout-1__header-wrapper-fixed > .layout-1__header > .header > .header__items > a > .base--clickable > .header-item__text > .txt--med'
    );
  }
  email() {
    return cy.get(':nth-child(3) > .frm');
  }
  password() {
    return cy.get(':nth-child(4) > .frm');
  }
  clickBtnLogin() {
    return cy.get('.btn-main');
  }
}

//export class Login;
