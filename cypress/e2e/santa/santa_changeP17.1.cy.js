import { faker } from '@faker-js/faker';
import { LoginPage } from '../../pages/loginPage';
const loginPageElements = require('../../fixtures/pages/loginPageSelectors.json');

describe('Change password', () => {
  it('user cannot login with old password', () => {
    let loginPage = new LoginPage();
    let oldPassword = 'Gibbon45';
    let newPassword = faker.internet.password(8);
    cy.log(newPassword);

    cy.visit('/');
    cy.contains('Вход и регистрация').click({ force: true });
    loginPage.login('kapadolgova@gmail.com', oldPassword);
    cy.contains('Коробки').should('exist');
    cy.changePassword('Irina', newPassword);

    cy.contains('Выйти с сайта').click();
    cy.visit('/');
    cy.contains('Вход и регистрация').click({ force: true });
    cy.get(loginPageElements.loginField).type('kapadolgova@gmail.com');
    cy.get(loginPageElements.passwordField).type(oldPassword);
    cy.get(loginPageElements.loginButton).click();
    cy.contains('Неверное имя пользователя или пароль').should('exist');

    cy.get(':nth-child(4) > .frm').clear().type(newPassword);
    cy.get('.btn-main').click();
    cy.changePassword('Irina', oldPassword);
  });
});
