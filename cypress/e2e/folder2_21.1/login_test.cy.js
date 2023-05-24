const users_new = require('../../fixtures/users_new.json');
import { Login } from '../../fixtures/Login';

describe('Testing login', () => {
  beforeEach('Visit', () => {
    cy.visit('/');
  });

  it('RegisterUser', () => {
    cy.loginSS(users_new.userAutor.email, users_new.userAutor.password).wait(
      5000
    );
    cy.contains('Irina').should('exist');
    cy.clearCookies();
  });

  it('User not register', () => {
    cy.loginSS(users_new.user4.email, users_new.user4.password).wait(5000);
    cy.contains(
      'Мы не нашли пользователя с таким email. Зарегистрироваться?'
    ).should('exist');
  });

  it('Not valid email', () => {
    cy.loginSS(users_new.user5.email, users_new.user5.password);
    cy.contains('Некорректный email').should('exist');
  });

  it('Not valid password', () => {
    cy.loginSS(users_new.user6.email, users_new.user6.password);
    cy.contains('Неверное имя пользователя или пароль').should('exist');
  });
});
