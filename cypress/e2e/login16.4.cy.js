const users = require('../fixtures/users.json');
import { Login } from '../fixtures/Login';

describe('Testing login', () => {
  beforeEach('Visit', () => {
    cy.visit('/login');
  });

  it('RegisterUser', () => {
    cy.loginSS('kapadolgova@gmail.com', 'Gibbon45');
    cy.contains('Irina').should('exist');
  });

  it('User not register', () => {
    cy.loginSS('kapadolgova10@gmail.com', 'Gibbon55');
    cy.contains(
      'Мы не нашли пользователя с таким email. Зарегистрироваться?'
    ).should('exist');
  });

  it('Not valid email', () => {
    cy.loginSS('kapadolgova@gmail', 'Gibbon45');
    cy.contains('Некорректный email').should('exist');
  });

  it('Not valid password', () => {
    cy.loginSS('kapadolgova@gmail.com', 'Gibbon');
    cy.contains('Неверное имя пользователя или пароль').should('exist');
  });
});
